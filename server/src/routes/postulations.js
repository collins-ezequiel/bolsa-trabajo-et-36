const express = require("express");
const router = express.Router();
const postulationsController = require("../controllers/postulationsController");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");
const { validateParams, validateBody } = require("../middlewares/validatorHandler");
const { idPostulationSchema, postulationSchema, updatePostulationSchema } = require("../schemas/postulationSchema");

// Crear postulación (USUARIO)
router.post(
    "/",
    authenticateToken,
    authorizeRoles("USUARIO"),
    validateBody(postulationSchema),
    postulationsController.createPostulation
);

// *** /mine debe ir ANTES de /:id ***
router.get(
    "/mine",
    authenticateToken,
    authorizeRoles("USUARIO"),
    postulationsController.getMyPostulations
);

// Ver todas (ADMIN, EMPRESA)
router.get(
    "/",
    authenticateToken,
    authorizeRoles("ADMIN", "EMPRESA"),
    postulationsController.getAllPostulations
);

// Ver una
router.get(
    "/:id",
    authenticateToken,
    validateParams(idPostulationSchema),
    postulationsController.getPostulationById
);

// Actualizar estado (EMPRESA o ADMIN)
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("EMPRESA", "ADMIN"),
    validateParams(idPostulationSchema),
    validateBody(updatePostulationSchema),
    postulationsController.updatePostulation
);

// Borrar (dueño o ADMIN)
router.delete(
    "/:id",
    authenticateToken,
    validateParams(idPostulationSchema),
    postulationsController.deletePostulation
);

module.exports = router;
