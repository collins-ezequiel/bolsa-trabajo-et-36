const Joi = require('joi');

// Alumno/Empresa crean validación → solo mandan título
const validationSchema = Joi.object({
    titulo: Joi.string().required()
});

// Para update (Admin cambia estado)
const updateValidationSchema = Joi.object({
    estado: Joi.string().valid('pendiente', 'aprobado', 'rechazado').required()
});

// Para buscar por id
const idValidationSchema = Joi.object({
    id: Joi.number().required()
});

module.exports = {
    validationSchema,
    updateValidationSchema,
    idValidationSchema
};
