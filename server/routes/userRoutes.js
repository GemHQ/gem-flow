const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');
const { prettyPrintResponse, mockAccessToken } = require('./routesUtil');
const pg = require('../pg');

/**
 * Creates a new user
 */
router.post('/', async (_req, res, next) => {
  try {
    const { id } = await gemApi.createUser();
    const accessToken = mockAccessToken();
    const user = await pg.createUser({
      gem_user_id: id,
      access_token: accessToken,
    });
    return res.json(user);
  } catch (e) {
    next(e);
  }
});

/**
 * Gets a list of users
 */
router.get('/', async (_req, res, next) => {
  try {
    const result = await gemApi.listUsers();
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Gets a single user
 */
router.get('/:id', async (req, res, next) => {
  try {
    const result = await gemApi.getUser(req.params.id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Delets a user
 * NOT SUPPORTED YET
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await gemApi.deleteUser(req.params.id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
