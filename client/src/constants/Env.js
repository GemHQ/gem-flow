import dotenv from 'dotenv';
dotenv.config();

const {
  REACT_APP_GEM_API_KEY,
  REACT_APP_COINBASE_CLIENT_ID,
  REACT_APP_GEM_CLIENT_BASE_URL = 'https://vgs-sandbox.gem.co',
  REACT_APP_SERVER_HOST = 'localhost',
  REACT_APP_SERVER_PORT = 3001,
} = process.env;

export {
  REACT_APP_GEM_API_KEY,
  REACT_APP_COINBASE_CLIENT_ID,
  REACT_APP_GEM_CLIENT_BASE_URL,
  REACT_APP_SERVER_HOST,
  REACT_APP_SERVER_PORT
}