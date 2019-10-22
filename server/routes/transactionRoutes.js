const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * Create a transaction
 */
router.post('/', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.createTransaction(req.body);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Confirm a transaction preview
 */
router.post('/confrim/:id', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.confirmTransaction(req.params.id);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get a transaction by ID
 */
router.get('/:id', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.getTransaction(req.params.id);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get a list of transactions
 */
router.get('/', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.listTransactions();
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});



module.exports = router;