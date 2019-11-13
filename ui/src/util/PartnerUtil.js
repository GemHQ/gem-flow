import dotenv from 'dotenv';
dotenv.config();

export const COINBASE_OAUTH_REDIRECT = encodeURI(`https://www.coinbase.com/oauth/authorize?client_id=${process.env.REACT_APP_COINBASE_CLIENT_ID}&redirect_uri=http://localhost:3000/coinbase/oauth&response_type=code&scope=wallet:user:read,wallet:accounts:read,wallet:deposits:read,wallet:withdrawals:read,wallet:buys:read,wallet:sells:read,wallet:orders:read,wallet:transactions:read,wallet:transactions:send&meta[send_limit_amount]=1&meta[send_limit_period]=day&meta[send_limit_currency]=USD&account=all`);