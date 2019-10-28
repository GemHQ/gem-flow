const util = require('util');

const prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};

const createMockId = () => ({ id: Math.random().toString(), created_at: Date.now().toString() });

  
const { Readable } = require('stream')


function bufferToStream(buffer) { 
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

module.exports = {
  prettyPrintResponse,
  createMockId,
  bufferToStream
};