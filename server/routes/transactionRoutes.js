const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');
const gemClient = require('../gemClient');

/**
 * Create a transaction
 */
router.post('/', async (req, res) => {
  try {
    const result = await gemApi.createTransaction(req.body);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Confirm a transaction preview
 */
router.post('/confrim/:id', async (req, res) => {
  try {
    const result = await gemApi.confirmTransaction(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get a transaction by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await gemApi.getTransaction(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get a list of transactions
 */
router.get('/list/:source_id', async (req, res) => {
  try {
    const result = await gemClient.get('/transactions', req.params);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});



module.exports = router;