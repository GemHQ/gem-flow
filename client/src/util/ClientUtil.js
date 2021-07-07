import SwaggerClient from 'swagger-client';

export const SERVER_URL = 'https://api.dev.us-west-2.gem.co/flux/v1';

// Intuit should generate username and password for each user (basic auth)

export const setupClient = async () => {
  const client = await SwaggerClient({
    url: 'https://api.dev.us-west-2.gem.co/flux/swagger',
    authorizations: {
      BasicAuth: {
        username: process.env.REACT_APP_DEMO_APP_USERNAME,
        password: process.env.REACT_APP_DEMO_APP_PASSWORD,
      },
    },
  });
  client.spec.servers = [{ url: SERVER_URL, description: 'Local' }];

  console.log(client.apis);

  return client;
};

export const CoinbaseOAuthParams = {
  provider_name: 'coinbase',
  provider_id:
    '93d7d07b5618cc48c2b2281b500641a716ce206422a5e6ef881465a2d9097ff8',
  offering_redirect_uri: process.env.REACT_APP_COINBASE_REDIRECT_URI,
  oauth2_scopes:
    'wallet:user:read,wallet:accounts:read,wallet:deposits:read,wallet:withdrawals:read,wallet:buys:read,wallet:sells:read,wallet:orders:read,wallet:transactions:read',
};
