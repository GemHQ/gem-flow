const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');

/**
 * Gets a single profile
 */
router.get('/', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.listProfiles();
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new profile
 */
router.post('/', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const profile = req.body.profile;
    // const result = await gemApi.createProfile(profile);
    // res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


/**
 * Gets a single profile
 */
router.get('/:id', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.getProfile(req.params.id);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Delets a single profile
 */
router.delete('/:id', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.deleteProfile(req.params.id);
    // res.json(result);
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Creates a new temporary profile
 */
router.post('/temporary_profile', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const profile = req.body.profile;
    // const result = await gemApi.createTemporaryProfile(profile);
    // res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});

/**
 * Attach a document to a profile. (Documents may have many files associated.)
 */
router.post('/document', async (req, res) => {
  res.status(204).json({ message: 'endpoint not yet supported' });
  try {
    // const result = await gemApi.createProfileDocument(req.body);
    // res.json(result);
    // TODO: update PG user with profile access token
  } catch(e) {
    res.status(500).json({ error: e });
  }
});


module.exports = router;