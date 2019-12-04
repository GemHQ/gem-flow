const dotenv = require('dotenv');
dotenv.config();

const { Gem, Models } = require('@gem.co/api').SDK;
const { GEM_API_KEY, GEM_API_SECRET } = process.env;

const gem = new Gem({
  apiKey: GEM_API_KEY,
  secretKey: GEM_API_SECRET,
});

module.exports = gem;
