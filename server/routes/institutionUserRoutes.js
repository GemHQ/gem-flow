const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * Gets a single intitutionUser
 */
app.get('/', async (req, res) => {
  try {
    const result = await gemApi.listProfiles();
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new intitutionUser
 */
app.post('/', async (req, res) => {
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