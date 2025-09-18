// routes/searchProfiles.js
const express = require('express');
const router = express.Router();
const { searchProfiles } = require('../controllers/searchProfilesController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');

router.get('/', authenticateToken, authorizeRoles('EMPRESA', 'ADMIN'), searchProfiles);

module.exports = router;