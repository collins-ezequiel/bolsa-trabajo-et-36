// routes/validation.js
const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validationController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const { validateBody, validateParams } = require('../middlewares/validatorHandler');
const { validationSchema, idValidationSchema } = require('../schemas/validationSchema');

router.post(
    '/',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPRESA'),
    validateBody(validationSchema),
    validationController.createValidation
);

router.get('/', authenticateToken, validationController.getAllValidations);

router.get(
    '/:id',
    authenticateToken,
    validateParams(idValidationSchema),
    validationController.getValidationById
);

router.put(
    '/:id',
    authenticateToken,
    authorizeRoles('ADMIN', 'EMPRESA'),
    validateBody(validationSchema),
    validationController.updateValidation
);

module.exports = router;

