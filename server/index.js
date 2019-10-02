const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var cors = require('cors');
const util = require('util');
const pg = require('./pg');
const gemApi = require('./gemApi');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());



/**
 * Creates a new user
 */
app.post('/user', async (req, res) => {

  const email = req.body.email;
  const result = await gemApi.createUser(email);
  prettyPrintResponse(result);

  // create user in local database
  const localUser = await pg.createUser(
    {
      gem_user_id: email,
      access_token: 'fake access token' //result.access_token
    });

  prettyPrintResponse(`User ${result.id} saved in local database under user ${localUser.id}`);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});

/**
 * Gets a list of users
 */
app.get('/user', async (req, res) => {

  const result = await gemApi.listUsers();
  // const result = await pg.listUsers();
  prettyPrintResponse(result);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});

/**
 * Gets a single user
 */
app.get('/user/:id', async (req, res) => {

  const result = await gemApi.getUser(req.params.id);
  prettyPrintResponse(result);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});


/**
 * Creates a new profile
 */
app.post('/profile', async (req, res) => {

  const profile = req.body.profile;
  const result = await gemApi.createProfile(profile);
  prettyPrintResponse(result);


  // TODO: update PG user with profile access token

  prettyPrintResponse(`User ${result.id} saved in local database under user ${localUser.id}`);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});


/**
 * Gets a single profile
 */
app.get('/profile/:id', async (req, res) => {

  const result = await gemApi.getProfile(req.params.id);
  prettyPrintResponse(result);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});



/**
 * Creates a new temporary profile
 */
app.post('/temporary_profile', async (req, res) => {

  const profile = req.body.profile;
  const result = await gemApi.createTemporaryProfile(profile);
  prettyPrintResponse(result);

  // TODO: update PG user with profile access token

  prettyPrintResponse(`User ${result.id} saved in local database under user ${localUser.id}`);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});



/**
 * Deletes a profile
 */
app.delete('/profile/:id', async (req, res) => {

  const result = await gemApi.deleteProfile(req.params.id);
  prettyPrintResponse(result);


  // TODO: update PG user with profile access token

  prettyPrintResponse(`User ${result.id} saved in local database under user ${localUser.id}`);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});







app.listen(process.env.PORT || 3001, () =>
  console.log(`Express server is running on ${process.env.PORT || 3001}`)
);

var prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};
