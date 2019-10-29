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
router.get('/:id', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.getAccount(req.params.id);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get a list of accounts
 */
router.post('/', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.listAccounts();
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});




module.exports = router;