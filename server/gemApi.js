const { Gem } = require('@gem.co/api').SDK;
const {
  GEM_API_KEY,
  GEM_API_SECRET,
  GEM_CLIENT_BASE_URL
} = require('./constants/Env');

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
  options: {
    timeout: 60000,
  },
  baseUrl: GEM_CLIENT_BASE_URL
});

module.exports = gem;
