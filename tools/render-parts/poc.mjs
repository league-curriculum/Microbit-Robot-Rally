// Proof of concept: load the vendored partdesigner bundle headlessly and turn
// one part string into an STL, to validate the pipeline before building it out.
import fs from 'node:fs';
import vm from 'node:vm';

const bundle = fs.readFileSync(new URL('./build/vendor-bundle.js', import.meta.url), 'utf8');

// vm context gets its own intrinsics; pass Node's ArrayBuffer/typed arrays so the
// STL ArrayBuffer is a Node one (Buffer.from works across realms otherwise fails).
const sandbox = {
  console, Math, isNaN, parseInt, parseFloat,
  ArrayBuffer, DataView, Float32Array, Int8Array, Int16Array, Int32Array, Uint8Array,
  gl: {}, canvas: {}, document: {}, window: {},
};
vm.createContext(sandbox);
vm.runInContext(
  bundle + '\n;globalThis.__pd = { Part, PartMeshGenerator, STLExporter, DEFAULT_MEASUREMENTS };',
  sandbox,
  { filename: 'vendor-bundle.js' }
);
const { Part, PartMeshGenerator, STLExporter, DEFAULT_MEASUREMENTS } = sandbox.__pd;
DEFAULT_MEASUREMENTS.enforceConstraints();

const partString = '0y17y11ey14dy19cy1113y11bay1299y13b8y11y1dy169y1c9y1155y1215y1311y1'; // CB Cargo Base
const part = Part.fromString(partString);
const mesh = new PartMeshGenerator(part, DEFAULT_MEASUREMENTS).getMesh();
console.log('triangles:', mesh.triangles.length);
const buffer = STLExporter.createBuffer(part, DEFAULT_MEASUREMENTS);
console.log('stl bytes:', buffer.byteLength);
fs.writeFileSync(new URL('./build/test.stl', import.meta.url), Buffer.from(buffer));
console.log('OK -> build/test.stl');
