import dotenv from 'dotenv';
dotenv.config();

const COINBASE_OAUTH_REDIRECT = encodeURI(`https://www.coinbase.com/oauth/authorize?client_id=${process.env.REACT_APP_COINBASE_CLIENT_ID}&redirect_uri=http://localhost:3000/coinbase/oauth&response_type=code&scope=wallet:user:read,wallet:accounts:read,wallet:deposits:read,wallet:withdrawals:read,wallet:buys:read,wallet:sells:read,wallet:orders:read,wallet:transactions:read,wallet:transactions:send&meta[send_limit_amount]=1&meta[send_limit_period]=day&meta[send_limit_currency]=USD&account=all`);

export const startCoinbaseOauthFlow = () => window.location = COINBASE_OAUTH_REDIRECT;

export const getOauthCode = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  if (code) window.history.replaceState(null, null, window.location.pathname);
  return code;
}

export const formatCoinbaseConnectionRequest = ({ oauthCode, userId }) => ({
  "user_id": userId,
  "credential_type": 'oauth2',
  "institution_id": 'coinbase',
  "credential": {
    "code": oauthCode
  }
})