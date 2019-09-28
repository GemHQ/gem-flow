const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var cors = require('cors');
const util = require('util');
const pg = require('./pg');
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
app.post('/users', async (req, res) => {

  const email = req.body.email;
  const result = await pg.createUser({ email });
  prettyPrintResponse(result);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});

/**
 * Gets a list of users
 */
app.get('/users', async (req, res) => {

  const result = await pg.getUsers();
  prettyPrintResponse(result);

  res.setHeader('Content-Type', 'application/json');
  res.json(result);
});

app.listen(process.env.PORT || 3001, () =>
  console.log(`Express server is running on ${process.env.PORT || 3001}`)
);

var prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};
