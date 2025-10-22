const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validationController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const { validateBody, validateParams } = require('../middlewares/validatorHandler');
const { validationSchema, idValidationSchema, updateValidationSchema } = require('../schemas/validationSchema');

// Alumno o Empresa pueden crear validaciones
router.post(
    '/',
    authenticateToken,
    authorizeRoles('USUARIO', 'EMPRESA'),
    validateBody(validationSchema),
    validationController.createValidation
);

// Admin ve todas
router.get('/', authenticateToken, authorizeRoles('ADMIN'), validationController.getAllValidations);

// Usuario ve solo las suyas
router.get('/mine', authenticateToken, validationController.getMyValidations);

// Un usuario puede ver una en específico
router.get(
    '/:id',
    authenticateToken,
    validateParams(idValidationSchema),
    validationController.getValidationById
);

// Admin actualiza estado (Aprobado / Rechazado)
router.put(
    '/:id',
    authenticateToken,
    authorizeRoles('ADMIN'),
    validateParams(idValidationSchema),
    validateBody(updateValidationSchema),
    validationController.updateValidation
);

module.exports = router;
