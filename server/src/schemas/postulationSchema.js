// schemas/postulationSchema.js
const Joi = require('joi');

const postulationSchema = Joi.object({
    oferta_id: Joi.number().integer().required(),
    mensaje: Joi.string().max(500).allow('', null)
});

const idPostulationSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

module.exports = {
    postulationSchema,
    idPostulationSchema
};