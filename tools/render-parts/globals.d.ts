// Browser globals referenced inside (never-called-headlessly) methods of the
// vendored partdesigner classes. Declared so the bundle type-checks; at runtime
// we stub them in the vm sandbox and never call the methods that use them.
declare var gl: any;
declare var canvas: any;
