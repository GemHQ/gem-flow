const dotenv = require('dotenv');
dotenv.config();

const {
  GEM_API_KEY, 
  GEM_API_SECRET,
  GEM_CLIENT_BASE_URL = 'https://vgs-sandbox.gem.co',
  PORT = 3001,
} = process.env;

module.exports = {
  GEM_API_KEY,
  GEM_API_SECRET,
  GEM_CLIENT_BASE_URL,
  PORT
}
