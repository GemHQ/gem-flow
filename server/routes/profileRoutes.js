const express = require('express');
const router = express.Router();
const gemApi = require('../gemApi');
const { Document } = require('@gem.co/api').SDK.Models;
const parseDataUrl = require('parse-data-url');

/**
 * Get a list of profiles for a user
 */
router.get('/:id', async (req, res, next) => {
  try {
    const result = await gemApi.listProfiles(req.params.id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Creates a new profile
 */
router.post('/', async (req, res, next) => {
  try {
    const { userId, profile } = req.body;
    const result = await gemApi.createProfile(userId, profile);
    // TODO: update PG user with profile access token
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Get a profile by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const result = await gemApi.getProfile(req.params.id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Delets a single profile
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await gemApi.deleteProfile(req.params.id);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Creates a new temporary profile
 */
router.post('/temporary_profile', async (req, res, next) => {
  try {
    const profile = req.body.profile;
    const result = await gemApi.createTemporaryProfile(profile);
    // TODO: update PG user with profile access token
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * Attach a document to a profile. (Documents may have many files associated.)
 */
router.post('/document', async (req, res, next) => {
  const { profileId, document } = req.body;

  const documentWithBinary = new Document({
    ...document,
    files: document.files.map(file => {
      const parsed = parseDataUrl(file.data);
      const data = Buffer.from(parsed.data, 'base64');
      return { ...file, data };
    }),
  });

  try {
    const result = await gemApi.createProfileDocument(
      profileId,
      documentWithBinary
    );
    return res.json(result);
    // TODO: update PG user with profile access token
  } catch (e) {
    next(e);
  }
});

module.exports = router;
