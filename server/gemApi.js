const { Gem, Models } = require('@gem.co/api').SDK;
const { GEM_API_KEY, GEM_API_SECRET } = process.env;

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
  baseUrl: 'https://vgs-dev.gem.farm',
  options: {
    timeout: 60000,
  },
});

module.exports = gem;
