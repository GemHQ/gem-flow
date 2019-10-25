const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * List all supported institutions
 */
router.get('/', async (req, res) => {
  try {
    const result = await gemApi.listInstitutions();
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Get an institution by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await gemApi.getInstitution(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Gets a single intitutionUser
 */
router.get('/user/:instituitonUserId', async (req, res) => {
  try {
    const result = await gemApi.getInstitutionUser(req.params.instituitonUserId);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new intitutionUser
 */
router.post('/user', async (req, res) => {
  try {
    const { profile_id, institution_id, business_account_id } = req.body;
    const result = await gemApi.createInstitutionUser(profile_id, institution_id, business_account_id);
    res.json(result);
    // TODO: update PG user with intitutionUser access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;