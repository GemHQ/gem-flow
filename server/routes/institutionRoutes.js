const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * List all supported institutions
 */
router.get('/', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.listInstitutions();
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new intitutionUser
 */
router.get('/:id', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.getInstitution(req.params.id);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Gets a single intitutionUser
 */
router.get('/user', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.listProfiles();
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new intitutionUser
 */
router.post('/user', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    const intitutionUser = req.body.intitutionUser;
    const result = await gemApi.createInstitutionUser(intitutionUser);
    res.json(result);
    // TODO: update PG user with intitutionUser access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;