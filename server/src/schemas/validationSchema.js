// schemas/validationSchema.js
const Joi = require('joi');

const validationSchema = Joi.object({
    usuario_id: Joi.number().integer().required(),
    titulo: Joi.string().required(),
    estado: Joi.string().valid('pendiente', 'aprobado', 'rechazado').optional()
});

const updateValidationSchema = Joi.object({
    estado: Joi.string().valid('pendiente', 'aprobado', 'rechazado').required()
});

const idValidationSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    validationSchema,
    updateValidationSchema,
    idValidationSchema
};