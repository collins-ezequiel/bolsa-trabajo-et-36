// schemas/postulationSchema.js
const Joi = require('joi');

const postulationSchema = Joi.object({
    oferta_id: Joi.number().integer().required(),
    mensaje: Joi.string().max(500).allow('', null)
});

const idPostulationSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

// 🔹 Nuevo schema para actualizar estado de una postulación
const updatePostulationSchema = Joi.object({
    estado: Joi.string().valid('pendiente', 'aprobado', 'rechazado').required()
});

module.exports = {
    postulationSchema,
    idPostulationSchema,
    updatePostulationSchema, 
};
