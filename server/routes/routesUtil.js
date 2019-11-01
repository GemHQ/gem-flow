const util = require('util'),
  uuid = require('uuid/v4');

const prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};

const createMockId = () => ({
  id: Math.random().toString(),
  created_at: Date.now().toString(),
});

const mockAccessToken = () => uuid();

module.exports = {
  prettyPrintResponse,
  createMockId,
  mockAccessToken,
};
