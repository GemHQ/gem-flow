const express = require('express');
const router = express.Router();
const gemClient = require('../gemClient');

/**
 * Get an account by ID
 */
router.get('/:user_id', async (req, res, next) => {
  try {
    const result = await gemClient.get(`/connections`, req.params);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
