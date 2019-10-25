const express = require('express');
const router = express.Router();
const gemClient = require('../gemClient');

/**
 * Get an account by ID
 */
router.get('/:user_id', async (req, res) => {
  try {
    const result = await gemClient.get(`/connections`, req.params);
    res.json(result);
  } catch(e) {
    console.log(e)
    res.status(500).json({ error: e });
  }
});

module.exports = router;