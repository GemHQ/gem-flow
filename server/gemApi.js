const { Gem, Models } = require('@gem.co/api').SDK;
const { GEM_API_KEY, GEM_API_SECRET } = process.env;

const gem = new Gem({
  apiKey: 'ae2aa16024193fe38ab75cf6528b366cba879d23c403e59405155cc07e4f8ac4',
  secretKey: '3f5ee43faa795423acca468ec994768825fd3f46199c319f22f33319d02bc5b3',
  baseUrl: 'https://vgs-dev.gem.farm',
  options: {
    timeout: 60000,
  },
});

module.exports = gem;
