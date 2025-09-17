const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offersController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const { validateBody, validateParams } = require('../middlewares/validatorHandler');
const { idOfferSchema, ofertaSchema } = require('../schemas/offerSchema');

router.get('/', authenticateToken, offersController.getAllOffers);
router.get('/:id', authenticateToken, validateParams(idOfferSchema), offersController.getOfferById);


router.post('/', authenticateToken, authorizeRoles('EMPRESA',), validateBody(ofertaSchema), offersController.createOffer);

router.put('/:id', authenticateToken, authorizeRoles('EMPRESA', 'ADMIN'), validateParams(idOfferSchema), validateBody(ofertaSchema), offersController.updateOffer);

router.delete('/:id', authenticateToken, authorizeRoles('EMPRESA', 'ADMIN'), validateParams(idOfferSchema), offersController.deleteOffer);

module.exports = router;
