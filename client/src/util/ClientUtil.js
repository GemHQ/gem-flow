import SwaggerClient from 'swagger-client';

export const SERVER_URL = 'https://gem-api.dev.us-west-2.gem.co/flux/v1';

// Intuit should generate username and password for each user (basic auth)

export const setupClient = async () => {
  const client = await SwaggerClient({
    url: 'https://gem-api.dev.us-west-2.gem.co/flux/swagger',
    authorizations: {
      BasicAuth: {
        username: process.env.REACT_APP_DEMO_APP_USERNAME,
        password: process.env.REACT_APP_DEMO_APP_PASSWORD,
      },
    },
  });
  console.log(client);

  console.log(client.apis);

  return client;
  // console.log('Creating user...');
  // // Find or create a user w/ the basic auth credentials
  // const { body: user } = await client.apis.Users.post_users();
  // console.log('User created:', user.data);
  // console.log('Creating + validating credentials...');
  // const { body: creds } = await client.apis.Credentials.post_credentials(null, {
  //   requestBody: {
  //     exchangeId: 'kraken',
  //     apiKey: process.env.KRAKEN_API_KEY,
  //     secret: process.env.KRAKEN_API_SECRET,
  //   },
  // });
  // const credential = creds.data;
  // console.log('Credentials created:', credential);
  // console.log('Getting accounts...');
  // const { body: accounts } = await client.apis.Accounts.get_accounts({
  //   proxyToken: credential.proxyToken,
  //   exchangeId: credential.exchangeId,
  // });
  // console.log('Accounts', accounts.data);
  // console.log('Getting transactions...');
  // const { body: transactions } =
  //   await client.apis.Transactions.get_transactions({
  //     proxyToken: credential.proxyToken,
  //     exchangeId: credential.exchangeId,
  //     accountId: accounts.data[0].accountId,
  //   });
  // console.log('Transactions', transactions.data);
};