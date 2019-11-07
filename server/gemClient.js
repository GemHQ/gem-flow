const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

const GemClient = require('@gem.co/api').Client;
const { GEM_API_KEY, GEM_API_SECRET } = process.env;

const gemClient = new GemClient({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
  options: {
    timeout: 60000,
  },
});

module.exports = gemClient;
