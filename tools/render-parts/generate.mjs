// Generate STL files + static 3/4-view PNG previews + Hugo data/content for the
// "3D Parts" section, from Parts Designer bookmark URLs and hand-provided STLs.
//
// Pipeline per part: decode/parse -> mesh triangles -> binary STL + a software
// z-buffer rasterized 3/4 PNG preview (no native deps, no live 3D).
//
// Results are CACHED by a hash of the input (part string / STL bytes) + RENDER_VERSION,
// so re-runs only reprocess new or changed parts. Bump RENDER_VERSION to force a
// full rebuild after changing the renderer.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

const RENDER_VERSION = 2; // bump to invalidate the cache after renderer changes

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, '../../site');
const STATIC_PARTS = path.join(SITE, 'static', 'parts');
const CONTENT_DIR = path.join(SITE, 'content', '3d-parts');
const DATA_FILE = path.join(SITE, 'data', 'parts3d.json');
const BOOKMARKS = path.join(HERE, 'data', 'cutebot-bookmarks.html');
const STL_SRC = path.join(HERE, 'stl');
const CACHE_FILE = path.join(HERE, 'build', 'cache.json');
const GROUP = 'cutebot';
const EDIT_BASE = 'https://lego3d.jointheleague.org/';

// ---------------------------------------------------------------------------
function loadPartdesigner() {
  const bundlePath = path.join(HERE, 'build', 'vendor-bundle.js');
  if (!fs.existsSync(bundlePath)) throw new Error('Missing build/vendor-bundle.js — run `tsc -p tsconfig.json`.');
  const sandbox = {
    console, Math, isNaN, parseInt, parseFloat,
    ArrayBuffer, DataView, Float32Array, Int8Array, Int16Array, Int32Array, Uint8Array,
    gl: {}, canvas: {}, document: {}, window: {},
  };
  vm.createContext(sandbox);
  vm.runInContext(
    fs.readFileSync(bundlePath, 'utf8') +
    '\n;globalThis.__pd = { Part, PartMeshGenerator, STLExporter, DEFAULT_MEASUREMENTS };',
    sandbox, { filename: 'vendor-bundle.js' });
  sandbox.__pd.DEFAULT_MEASUREMENTS.enforceConstraints();
  return sandbox.__pd;
}

function parseBookmarks(html) {
  const out = [], seen = new Set();
  for (const a of parse(html).querySelectorAll('a')) {
    const href = a.getAttribute('href'); if (!href) continue;
    let url; try { url = new URL(href); } catch { continue; }
    const partString = url.searchParams.get('part');
    if (!partString || seen.has(partString)) continue;
    seen.add(partString);
    out.push({ name: url.searchParams.get('name') || a.text.trim(), partString });
  }
  return out;
}

const slugify = (name) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const hashKey = (s) => crypto.createHash('sha256').update(`v${RENDER_VERSION}|`).update(s).digest('hex').slice(0, 16);

function parseBinarySTL(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const count = dv.getUint32(80, true);
  const rd = (o) => ({ x: dv.getFloat32(o, true), y: dv.getFloat32(o + 4, true), z: dv.getFloat32(o + 8, true) });
  const up = (v) => ({ x: v.x, y: v.z, z: -v.y }); // Z-up print STL -> renderer Y-up (proper rotation)
  const tris = [];
  for (let i = 0, p = 84; i < count; i++, p += 50) tris.push({ v1: up(rd(p + 12)), v2: up(rd(p + 24)), v3: up(rd(p + 36)) });
  return tris;
}

// ---------------------------------------------------------------------------
// 3/4-view projection. Returns faces with per-vertex screen coords (part units)
// + per-vertex view depth (for the z-buffer) + a two-sided flat shade.
// ---------------------------------------------------------------------------
function project(triangles) {
  const YAW = -35 * Math.PI / 180, PITCH = 26 * Math.PI / 180;
  const cY = Math.cos(YAW), sY = Math.sin(YAW), cX = Math.cos(PITCH), sX = Math.sin(PITCH);
  const rot = (p) => {
    const x = p.x * cY + p.z * sY, z0 = -p.x * sY + p.z * cY;
    return { x, y: p.y * cX - z0 * sX, z: p.y * sX + z0 * cX };
  };
  const m = Math.hypot(-0.4, 0.6, 0.7), L = { x: -0.4 / m, y: 0.6 / m, z: 0.7 / m };
  const AMBIENT = 0.42, DIFFUSE = 0.58;
  const faces = [];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const t of triangles) {
    const a = rot(t.v1), b = rot(t.v2), c = rot(t.v3);
    let nx = (b.y - a.y) * (c.z - a.z) - (b.z - a.z) * (c.y - a.y);
    let ny = (b.z - a.z) * (c.x - a.x) - (b.x - a.x) * (c.z - a.z);
    let nz = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const nm = Math.hypot(nx, ny, nz) || 1; nx /= nm; ny /= nm; nz /= nm;
    if (nz < 0) { nx = -nx; ny = -ny; nz = -nz; } // two-sided: face the camera
    const shade = Math.min(1, AMBIENT + DIFFUSE * Math.max(0, nx * L.x + ny * L.y + nz * L.z));
    const X = [a.x, b.x, c.x], Y = [-a.y, -b.y, -c.y], D = [a.z, b.z, c.z];
    for (let i = 0; i < 3; i++) {
      if (X[i] < minX) minX = X[i]; if (X[i] > maxX) maxX = X[i];
      if (Y[i] < minY) minY = Y[i]; if (Y[i] > maxY) maxY = Y[i];
    }
    faces.push({ x: X, y: Y, d: D, shade });
  }
  return { faces, minX, maxX, minY, maxY };
}

function renderPNG(triangles, { size = 320, base = [150, 170, 190] } = {}) {
  const { faces, minX, maxX, minY, maxY } = project(triangles);
  if (!faces.length) return null;
  const SS = size * 2, margin = 0.06 * SS;
  const w = maxX - minX || 1, h = maxY - minY || 1;
  const scale = (SS - 2 * margin) / Math.max(w, h);
  const ox = margin + (SS - 2 * margin - w * scale) / 2;
  const oy = margin + (SS - 2 * margin - h * scale) / 2;
  const color = new Uint8Array(SS * SS * 4);
  const zbuf = new Float32Array(SS * SS).fill(-Infinity);
  for (const f of faces) {
    const px = [0, 1, 2].map((i) => ox + (f.x[i] - minX) * scale);
    const py = [0, 1, 2].map((i) => oy + (f.y[i] - minY) * scale);
    const r = Math.round(base[0] * f.shade), g = Math.round(base[1] * f.shade), bl = Math.round(base[2] * f.shade);
    fillZ(color, zbuf, SS, SS, px, py, f.d, r, g, bl);
  }
  // box-downscale 2x -> size (anti-alias)
  const out = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let R = 0, G = 0, B = 0, A = 0;
    for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
      const i = ((y * 2 + dy) * SS + (x * 2 + dx)) * 4;
      R += color[i]; G += color[i + 1]; B += color[i + 2]; A += color[i + 3];
    }
    const o = (y * size + x) * 4;
    out[o] = R >> 2; out[o + 1] = G >> 2; out[o + 2] = B >> 2; out[o + 3] = A >> 2;
  }
  return encodePNG(size, size, out);
}

function fillZ(color, zbuf, W, H, px, py, d, r, g, b) {
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
      const depth = w0 * d[0] + w1 * d[1] + w2 * d[2];
      const zi = y * W + x;
      if (depth <= zbuf[zi]) continue; // nearer (camera at +Z) wins
      zbuf[zi] = depth;
      const i = zi * 4;
      color[i] = r; color[i + 1] = g; color[i + 2] = b; color[i + 3] = 255;
    }
  }
}

function encodePNG(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) Buffer.from(rgba.buffer, y * stride, stride).copy(raw, y * (stride + 1) + 1);
  const idat = zlib.deflateSync(raw, { level: 9 });
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const t = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4); crc.writeUInt32BE(zlib.crc32(Buffer.concat([t, data])) >>> 0, 0);
    return Buffer.concat([len, t, data, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

// ---------------------------------------------------------------------------
function main() {
  const pd = loadPartdesigner();

  // Build the ordered work list: generated (bookmarks) then hand STLs.
  const items = [];
  for (const { name, partString } of parseBookmarks(fs.readFileSync(BOOKMARKS, 'utf8'))) {
    items.push({ name, slug: slugify(name), kind: 'gen', partString,
      editUrl: `${EDIT_BASE}?part=${encodeURIComponent(partString)}&name=${encodeURIComponent(name)}` });
  }
  if (fs.existsSync(STL_SRC)) {
    for (const file of fs.readdirSync(STL_SRC).filter((f) => /\.stl$/i.test(f)).sort()) {
      items.push({ name: file.replace(/\.stl$/i, ''), slug: slugify(file.replace(/\.stl$/i, '')), kind: 'stl', file, editUrl: null });
    }
  }
  if (!items.length) throw new Error('No parts found.');

  fs.mkdirSync(STATIC_PARTS, { recursive: true });
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });

  const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
  const newCache = {};
  const records = [];
  const desired = new Set();
  let built = 0, cached = 0;

  for (const it of items) {
    desired.add(it.slug);
    const stlPath = path.join(STATIC_PARTS, `${it.slug}.stl`);
    const pngPath = path.join(STATIC_PARTS, `${it.slug}.png`);
    const key = hashKey(it.kind === 'gen' ? it.partString : fs.readFileSync(path.join(STL_SRC, it.file)));
    const hit = cache[it.slug];
    if (hit && hit.key === key && fs.existsSync(stlPath) && (!hit.record.hasPreview || fs.existsSync(pngPath))) {
      records.push(hit.record); newCache[it.slug] = hit; cached++;
      continue;
    }
    let tris, stlBuf;
    if (it.kind === 'gen') {
      const part = pd.Part.fromString(it.partString);
      tris = new pd.PartMeshGenerator(part, pd.DEFAULT_MEASUREMENTS).getMesh().triangles;
      stlBuf = Buffer.from(pd.STLExporter.createBuffer(part, pd.DEFAULT_MEASUREMENTS));
    } else {
      stlBuf = fs.readFileSync(path.join(STL_SRC, it.file));
      tris = parseBinarySTL(stlBuf);
    }
    fs.writeFileSync(stlPath, stlBuf);
    const png = renderPNG(tris);
    if (png) fs.writeFileSync(pngPath, png); else fs.rmSync(pngPath, { force: true });
    const record = { name: it.name, slug: it.slug, triangles: tris.length, hasPreview: !!png, editUrl: it.editUrl };
    records.push(record); newCache[it.slug] = { key, record }; built++;
    console.log(`  built ${it.name} -> ${it.slug} (${tris.length} tris)${png ? ', ' + (png.length / 1024).toFixed(0) + 'KB png' : ''}`);
  }

  // Remove files for parts that are no longer present.
  for (const f of fs.readdirSync(STATIC_PARTS)) {
    const slug = f.replace(/\.(stl|png)$/i, '');
    if (!desired.has(slug)) { fs.rmSync(path.join(STATIC_PARTS, f), { force: true }); console.log(`  removed stale ${f}`); }
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(newCache));
  fs.writeFileSync(DATA_FILE, JSON.stringify({ [GROUP]: records }, null, 2));
  fs.writeFileSync(path.join(CONTENT_DIR, '_index.md'),
    `---\ntitle: "3D Parts"\nweight: 70\n---\n\n` +
    `Printable LEGO-Technic-compatible parts for the Cutebot, ready to download as\n` +
    `STL and print — no design work needed. Each Parts Designer part also links back\n` +
    `to the designer if you want to tweak it.\n`);
  fs.writeFileSync(path.join(CONTENT_DIR, 'cutebot.md'),
    `---\ntitle: "Cutebot Parts"\nweight: 10\ndescription: "Printable Cutebot attachments and mounts — download the STL or edit in Parts Designer."\n---\n\n` +
    `Download an STL to print, or open a Parts Designer part to modify it.\n\n` +
    `{{< parts-gallery "${GROUP}" >}}\n`);

  console.log(`\n${records.length} parts (${built} built, ${cached} cached).`);
}

main();
