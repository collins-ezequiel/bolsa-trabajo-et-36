// schemas/profileSchema.js
const Joi = require('joi');

const profileSchema = Joi.object({
    descripcion: Joi.string().max(500).required(),
    aptitudes: Joi.array().items(Joi.string()).required(),
    experiencia: Joi.string().max(1000).required(),
    educacion: Joi.string().max(1000).required(),
    foto_perfil: Joi.string().uri().allow(null, '')
});

module.exports = {
    profileSchema
};