const util = require('util');

const prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};

const createMockId = () => ({ id: Math.random().toString(), created_at: Date.now().toString() });

module.exports = {
  prettyPrintResponse,
  createMockId
};