// Generate STL files + static 3/4-view PNG previews + Hugo data/content for the
// "3D Parts" section, from Parts Designer bookmark URLs.
//
// Pipeline: parse bookmarks -> for each part:
//   Part.fromString -> PartMeshGenerator.getMesh()  (headless, no WebGL)
//     -> STLExporter binary STL  (site/static/parts/<slug>.stl)
//     -> software-rendered 3/4 PNG (site/static/parts/<slug>.png)
// then write site/data/parts3d.json + the Hugo section content.
//
// The vendored partdesigner classes are global-namespace TS; we compile them to
// build/vendor-bundle.js (tsc) and load that bundle in a vm sandbox. The PNG
// preview is rendered by a tiny software rasterizer (no native deps).

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '../../site');
const STATIC_PARTS = path.join(SITE, 'static', 'parts');
const CONTENT_DIR = path.join(SITE, 'content', '3d-parts');
const DATA_FILE = path.join(SITE, 'data', 'parts3d.json');
const BOOKMARKS = path.join(HERE, 'data', 'cutebot-bookmarks.html');
const GROUP = 'cutebot';
const EDIT_BASE = 'https://lego3d.jointheleague.org/';

// ---------------------------------------------------------------------------
// Load the vendored partdesigner geometry into a sandbox.
// ---------------------------------------------------------------------------
function loadPartdesigner() {
  const bundlePath = path.join(HERE, 'build', 'vendor-bundle.js');
  if (!fs.existsSync(bundlePath)) {
    throw new Error('Missing build/vendor-bundle.js — run `tsc -p tsconfig.json` first.');
  }
  const bundle = fs.readFileSync(bundlePath, 'utf8');
  const sandbox = {
    console, Math, isNaN, parseInt, parseFloat,
    ArrayBuffer, DataView, Float32Array, Int8Array, Int16Array, Int32Array, Uint8Array,
    gl: {}, canvas: {}, document: {}, window: {}, // referenced only in methods we never call
  };
  vm.createContext(sandbox);
  vm.runInContext(
    bundle + '\n;globalThis.__pd = { Part, PartMeshGenerator, STLExporter, DEFAULT_MEASUREMENTS };',
    sandbox, { filename: 'vendor-bundle.js' });
  const pd = sandbox.__pd;
  pd.DEFAULT_MEASUREMENTS.enforceConstraints();
  return pd;
}

// ---------------------------------------------------------------------------
// Parse bookmarks: take every Parts Designer link (file is already scoped to the
// target folder; the Netscape DT/DL nesting is too loose to reliably sub-scope).
// ---------------------------------------------------------------------------
function parseBookmarks(html) {
  const root = parse(html);
  const out = [];
  const seen = new Set();
  for (const a of root.querySelectorAll('a')) {
    const href = a.getAttribute('href');
    if (!href) continue;
    let url;
    try { url = new URL(href); } catch { continue; }
    const partString = url.searchParams.get('part');
    if (!partString || seen.has(partString)) continue;
    seen.add(partString);
    out.push({ name: url.searchParams.get('name') || a.text.trim(), partString });
  }
  return out;
}

const slugify = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// ---------------------------------------------------------------------------
// Project the mesh to a 3/4 view: rotate, cull back-faces, flat-shade, project.
// Returns { faces:[{x:[3],y:[3],depth,shade}], minX,maxX,minY,maxY } in part units.
// ---------------------------------------------------------------------------
function project(triangles) {
  const YAW = -35 * Math.PI / 180, PITCH = 26 * Math.PI / 180;
  const cY = Math.cos(YAW), sY = Math.sin(YAW), cX = Math.cos(PITCH), sX = Math.sin(PITCH);
  const rot = (p) => {
    const x = p.x * cY + p.z * sY, z0 = -p.x * sY + p.z * cY;
    return { x, y: p.y * cX - z0 * sX, z: p.y * sX + z0 * cX };
  };
  const L = (() => { const m = Math.hypot(-0.4, 0.6, 0.7); return { x: -0.4 / m, y: 0.6 / m, z: 0.7 / m }; })();
  const AMBIENT = 0.45, DIFFUSE = 0.55;
  const faces = [];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const t of triangles) {
    const a = rot(t.v1), b = rot(t.v2), c = rot(t.v3);
    const ux = b.x - a.x, uy = b.y - a.y, uz = b.z - a.z;
    const vx = c.x - a.x, vy = c.y - a.y, vz = c.z - a.z;
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const nm = Math.hypot(nx, ny, nz) || 1; nx /= nm; ny /= nm; nz /= nm;
    if (nz <= 0) continue; // cull back-faces (camera at +Z)
    const shade = Math.min(1, AMBIENT + DIFFUSE * Math.max(0, nx * L.x + ny * L.y + nz * L.z));
    const X = [a.x, b.x, c.x], Y = [-a.y, -b.y, -c.y]; // SVG/screen y grows down
    for (let i = 0; i < 3; i++) {
      if (X[i] < minX) minX = X[i]; if (X[i] > maxX) maxX = X[i];
      if (Y[i] < minY) minY = Y[i]; if (Y[i] > maxY) maxY = Y[i];
    }
    faces.push({ x: X, y: Y, depth: (a.z + b.z + c.z) / 3, shade });
  }
  faces.sort((p, q) => p.depth - q.depth); // far first (painter's)
  return { faces, minX, maxX, minY, maxY };
}

// ---------------------------------------------------------------------------
// Software-rasterize the projected faces to a transparent RGBA PNG (2x supersampled
// then box-downscaled for anti-aliasing). Pure Node — no native deps.
// ---------------------------------------------------------------------------
function renderPNG(triangles, { size = 320, base = [150, 170, 190] } = {}) {
  const { faces, minX, maxX, minY, maxY } = project(triangles);
  if (!faces.length) return null;
  const SS = size * 2, margin = 0.06 * SS;
  const w = maxX - minX || 1, h = maxY - minY || 1;
  const scale = (SS - 2 * margin) / Math.max(w, h);
  const ox = margin + (SS - 2 * margin - w * scale) / 2;
  const oy = margin + (SS - 2 * margin - h * scale) / 2;

  const buf = new Uint8Array(SS * SS * 4); // transparent
  for (const f of faces) {
    const px = [0, 1, 2].map((i) => ox + (f.x[i] - minX) * scale);
    const py = [0, 1, 2].map((i) => oy + (f.y[i] - minY) * scale);
    const r = Math.round(base[0] * f.shade), g = Math.round(base[1] * f.shade), bl = Math.round(base[2] * f.shade);
    fillTriangle(buf, SS, SS, px, py, r, g, bl);
  }
  // box-downscale 2x -> size
  const out = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let R = 0, G = 0, B = 0, A = 0;
      for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
        const i = ((y * 2 + dy) * SS + (x * 2 + dx)) * 4;
        R += buf[i]; G += buf[i + 1]; B += buf[i + 2]; A += buf[i + 3];
      }
      const o = (y * size + x) * 4;
      out[o] = R >> 2; out[o + 1] = G >> 2; out[o + 2] = B >> 2; out[o + 3] = A >> 2;
    }
  }
  return encodePNG(size, size, out);
}

function fillTriangle(buf, W, H, px, py, r, g, b) {
  const minx = Math.max(0, Math.floor(Math.min(px[0], px[1], px[2])));
  const maxx = Math.min(W - 1, Math.ceil(Math.max(px[0], px[1], px[2])));
  const miny = Math.max(0, Math.floor(Math.min(py[0], py[1], py[2])));
  const maxy = Math.min(H - 1, Math.ceil(Math.max(py[0], py[1], py[2])));
  const area = (px[1] - px[0]) * (py[2] - py[0]) - (px[2] - px[0]) * (py[1] - py[0]);
  if (area === 0) return;
  const inv = 1 / area;
  for (let y = miny; y <= maxy; y++) {
    const cy = y + 0.5;
    for (let x = minx; x <= maxx; x++) {
      const cx = x + 0.5;
      const w0 = ((px[1] - cx) * (py[2] - cy) - (px[2] - cx) * (py[1] - cy)) * inv;
      const w1 = ((px[2] - cx) * (py[0] - cy) - (px[0] - cx) * (py[2] - cy)) * inv;
      const w2 = 1 - w0 - w1;
      if (w0 < 0 || w1 < 0 || w2 < 0) continue;
      const i = (y * W + x) * 4;
      buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
    }
  }
}

function encodePNG(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    Buffer.from(rgba.buffer, y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32(Buffer.concat([t, data])) >>> 0, 0);
    return Buffer.concat([len, t, data, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit, RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------------------------------------------------------------------------
function main() {
  const { Part, PartMeshGenerator, STLExporter, DEFAULT_MEASUREMENTS } = loadPartdesigner();
  const entries = parseBookmarks(fs.readFileSync(BOOKMARKS, 'utf8'));
  if (!entries.length) throw new Error('No parts found.');

  fs.rmSync(STATIC_PARTS, { recursive: true, force: true }); // clear stale files
  fs.mkdirSync(STATIC_PARTS, { recursive: true });
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });

  const records = [];
  for (const { name, partString } of entries) {
    const slug = slugify(name);
    let part, mesh;
    try {
      part = Part.fromString(partString);
      mesh = new PartMeshGenerator(part, DEFAULT_MEASUREMENTS).getMesh();
    } catch (e) {
      console.error(`  ! ${name}: ${e.message}`);
      continue;
    }
    fs.writeFileSync(path.join(STATIC_PARTS, `${slug}.stl`), Buffer.from(STLExporter.createBuffer(part, DEFAULT_MEASUREMENTS)));
    const png = renderPNG(mesh.triangles);
    if (png) fs.writeFileSync(path.join(STATIC_PARTS, `${slug}.png`), png);
    records.push({
      name, slug, triangles: mesh.triangles.length, hasPreview: !!png,
      editUrl: `${EDIT_BASE}?part=${encodeURIComponent(partString)}&name=${encodeURIComponent(name)}`,
    });
    console.log(`  ${name} -> ${slug}.stl (${mesh.triangles.length} tris), ${slug}.png ${png ? '(' + (png.length / 1024).toFixed(0) + 'KB)' : '(none)'}`);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify({ [GROUP]: records }, null, 2));
  fs.writeFileSync(path.join(CONTENT_DIR, '_index.md'),
    `---\ntitle: "3D Parts"\nweight: 70\n---\n\n` +
    `Printable LEGO-Technic-compatible parts for the Cutebot, ready to download as\n` +
    `STL and print — no design work needed. Each part also links to the Parts\n` +
    `Designer if you want to tweak it.\n`);
  fs.writeFileSync(path.join(CONTENT_DIR, 'cutebot.md'),
    `---\ntitle: "Cutebot Parts"\nweight: 10\ndescription: "Printable Cutebot attachments and mounts — download the STL or edit in Parts Designer."\n---\n\n` +
    `These parts mount on the Cutebot. Download the STL to print, or open a part in\n` +
    `the Parts Designer to modify it.\n\n` +
    `{{< parts-gallery "${GROUP}" >}}\n`);

  console.log(`\nWrote ${records.length} parts to site/static/parts/, data/parts3d.json, content/3d-parts/.`);
}

main();
