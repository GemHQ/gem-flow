const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * Create an account
 */
router.post('/', async (req, res) => {
  try {
    const result = await gemApi.createAccount(req.body);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get an account by ID
 */
router.get('/:account_id', async (req, res) => {
  try {
    const result = await gemApi.getAccount(req.params.account_id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get a list of accounts
 */
router.get('/list/:connection_id', async (req, res) => {
  try {
    const result = await gemApi.listAccounts(req.params.connection_id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});




module.exports = router;