// routes/searchOffers.js
const express = require('express');
const router = express.Router();

const { searchOffers } = require('../controllers/searchoffersController');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', authenticateToken, searchOffers);

module.exports = router;