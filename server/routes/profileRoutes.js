const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * Gets a single profile
 */
app.get('/profile', async (req, res) => {
  try {
    const result = await gemApi.listProfiles();
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new profile
 */
app.post('/profile', async (req, res) => {
  try {
    const profile = req.body.profile;
    const result = await gemApi.createProfile(profile);
    res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


/**
 * Gets a single profile
 */
app.get('/profile/:id', async (req, res) => {
  try {
    const result = await gemApi.getProfile(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Gets a single profile
 */
app.delete('/profile/:id', async (req, res) => {
  try {
    res.json({ message: 'endpoint not yet supported' });
    // const result = await gemApi.deleteProfile(req.params.id);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new temporary profile
 */
app.post('/temporary_profile', async (req, res) => {
  try {
    const profile = req.body.profile;
    const result = await gemApi.createTemporaryProfile(profile);
    res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});



module.exports = router;