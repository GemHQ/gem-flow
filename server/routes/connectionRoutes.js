const express = require('express');
const router = express.Router();
const gemClient = require('../gemClient');

/**
 * Get a list of connections by user ID
 */
router.get('/:user_id', async (req, res, next) => {
  try {
    const result = await gemClient.get(`/connections`, req.params);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Create a connection
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await gemClient.post(`/connections`, req.body);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Create a credential
 */
router.post('/credentials', async (req, res, next) => {
  try {
    // TODO: do not use gem client, just send unsigned request with gem api key in header
    // either here or in frontend 
    const result = await gemClient.post(`/credentials`, req.body);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
