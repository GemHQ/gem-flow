const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * List all supported institutions
 */
router.get('/', async (_req, res, next) => {
  try {
    const result = await gemApi.listInstitutions();
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Get an institution by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const result = await gemApi.getInstitution(req.params.id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Gets a single intitutionUser
 */
router.get('/user/:instituiton_user_id', async (req, res, next) => {
  try {
    const result = await gemApi.getInstitutionUser(
      req.params.instituiton_user_id
    );
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Creates a new intitutionUser
 */
router.post('/user', async (req, res, next) => {
  try {
    const { profile_id, institution_id, business_account_id } = req.body;
    const result = await gemApi.createInstitutionUser(
      profile_id,
      institution_id,
      business_account_id
    );
    // TODO: update PG user with intitutionUser access token
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
