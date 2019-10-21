const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');
const { prettyPrintResponse } = require('./routesUtil');

/**
 * Creates a new user
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await gemApi.createUser();
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }

  // // create user in local database
  // const localUser = await pg.createUser(
  //   {
  //     gem_user_id: result.id,
  //     access_token: 'fake access token' //result.access_token
  //   });

  // prettyPrintResponse(`User ${result.id} saved in local database under user ${localUser.id}`);

});

/**
 * Gets a list of users
 */
router.get('/', async (req, res) => {
  try {
    const result = await gemApi.listUsers();
    // const result = await pg.listUsers();
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Gets a single user
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await gemApi.getUser(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Delets a user
 * NOT SUPPORTED YET
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await gemApi.deleteUser(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;