// schemas/validationSchema.js
const Joi = require('joi');

const validationSchema = Joi.object({
    usuario_id: Joi.number().integer().required(),
    titulo: Joi.string().max(255).required(),
    estado: Joi.string().valid('pendiente', 'aprobado', 'rechazado').optional()
});

const idValidationSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    validationSchema,
    idValidationSchema
};