const _err = new Error('supertable:: Should require the component you require directly eg. `const Table = require("supertable/lib/Table");`');
console.warn(_err.stack);

const supertable = {};

module.exports = supertable;
