const Joi = require("joi");

const profileSchema = Joi.object({
    descripcion: Joi.string().allow("").optional(),

    // Arrays de strings (acepta vacío)
    aptitudes: Joi.array().items(Joi.string().allow("")).default([]),

    experiencia: Joi.array().items(Joi.string().allow("")).default([]),

    educacion: Joi.array().items(Joi.string().allow("")).default([]),

    // Foto de perfil opcional (puede ser null o string vacío)
    foto_perfil: Joi.string().uri().allow(null, "").optional(),
});

module.exports = { profileSchema };