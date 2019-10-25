const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * Get a list of profiles for a user
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await gemApi.listProfiles(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new profile
 */
router.post('/', async (req, res) => {
  try {
    const { userId, profile } = req.body;
    const result = await gemApi.createProfile(userId, profile);
    res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


/**
 * Get a profile by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const result = await gemApi.getProfile(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Delets a single profile
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await gemApi.deleteProfile(req.params.id);
    res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new temporary profile
 */
router.post('/temporary_profile', async (req, res) => {
  try {
    const profile = req.body.profile;
    const result = await gemApi.createTemporaryProfile(profile);
    res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Attach a document to a profile. (Documents may have many files associated.)
 */
router.post('/document', async (req, res) => {
  const { profileId, documents } = req.body;
  try {
    const result = await gemApi.createProfileDocument(profileId, documents);
    res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;