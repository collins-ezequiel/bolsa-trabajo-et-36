// routes/offers.js
const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offersController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const { validateBody, validateParams } = require('../middlewares/validatorHandler');
const { idOfferSchema, ofertaSchema } = require('../schemas/offerSchema');

// Todas las ofertas (usuarios logueados)
router.get('/', authenticateToken, offersController.getAllOffers);

// Mis ofertas (solo EMPRESA)
router.get('/mine', authenticateToken, authorizeRoles('EMPRESA'), offersController.getMyOffers);

// Ver oferta por id
router.get('/:id', authenticateToken, validateParams(idOfferSchema), offersController.getOfferById);

// Crear oferta (solo EMPRESA)
router.post(
    '/',
    authenticateToken,
    authorizeRoles('EMPRESA'),
    validateBody(ofertaSchema),
    offersController.createOffer
);



// Actualizar oferta (EMPRESA o ADMIN)
router.put(
    '/:id',
    authenticateToken,
    authorizeRoles('EMPRESA', 'ADMIN'),
    validateParams(idOfferSchema),
    validateBody(ofertaSchema),
    offersController.updateOffer
);

// Eliminar oferta (EMPRESA o ADMIN)
router.delete(
    '/:id',
    authenticateToken,
    authorizeRoles('EMPRESA', 'ADMIN'),
    validateParams(idOfferSchema),
    offersController.deleteOffer
);

module.exports = router;
