const express = require('express');
const router = express.Router();

const { compareProfileToOffer } = require('../controllers/matchController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const { validateParams } = require('../middlewares/validatorHandler');
const Joi = require('joi');

const ofertaIdSchema = Joi.object({
    ofertaId: Joi.number().integer().positive().required()
});

router.get(
    '/:ofertaId',
    authenticateToken,
    authorizeRoles('USUARIO'),
    validateParams(ofertaIdSchema),
    compareProfileToOffer
);

module.exports = router;