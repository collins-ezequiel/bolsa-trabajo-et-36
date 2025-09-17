// routes/postulations.js
const express = require('express');
const router = express.Router();
const postulationsController = require('../controllers/postulationsController');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth');
const { validateBody, validateParams } = require('../middlewares/validatorHandler');
const { postulationSchema, idPostulationSchema } = require('../schemas/postulationSchema');

router.post(
    '/',
    authenticateToken,
    authorizeRoles('USUARIO'),
    validateBody(postulationSchema),
    postulationsController.createPostulation
);

router.get(
    '/',
    authenticateToken,
    postulationsController.getAllPostulations
);

router.get(
    '/:id',
    authenticateToken,
    validateParams(idPostulationSchema),
    postulationsController.getPostulationById
);

router.delete(
    '/:id',
    authenticateToken,
    authorizeRoles('USUARIO', 'ADMIN'),
    validateParams(idPostulationSchema),
    postulationsController.deletePostulation
);

module.exports = router;