const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");
const adminController = require("../controllers/adminController");

router.get(
    "/users",
    authenticateToken,
    authorizeRoles("ADMIN"),
    adminController.getAllUsers
);

router.get(
    "/validations",
    authenticateToken,
    authorizeRoles("ADMIN"),
    adminController.getAllValidations
);

router.put(
    "/validations/:id",
    authenticateToken,
    authorizeRoles("ADMIN"),
    adminController.updateValidation
);


module.exports = router;
