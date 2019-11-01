const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * Create an account
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await gemApi.createAccount(req.body);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Get an account by ID
 */
router.get('/:account_id', async (req, res, next) => {
  try {
    const result = await gemApi.getAccount(req.params.account_id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Get a list of accounts
 */
router.get('/list/:connection_id', async (req, res, next) => {
  try {
    const result = await gemApi.listAccounts(req.params.connection_id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
