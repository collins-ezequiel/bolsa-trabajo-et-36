const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateBody } = require('../middlewares/validatorHandler');
const Joi = require('joi');

// Schemas para validar register y login

const registerSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  email: Joi.string().email().required(),
  contraseña: Joi.string().min(6).required(),
  rol: Joi.string().valid('USUARIO', 'EMPRESA', 'ADMIN').required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  contraseña: Joi.string().required()
});

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

module.exports = router;
