const {
  GEM_API_KEY,
  GEM_API_SECRET,
  GEM_CLIENT_BASE_URL
} = require('./constants/Env');

const GemClient = require('@gem.co/api').Client;

const gemClient = new GemClient({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
  baseUrl: GEM_CLIENT_BASE_URL
});

module.exports = gemClient;
