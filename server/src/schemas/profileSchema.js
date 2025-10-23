const Joi = require("joi");
const skillsList = require("../utils/skillsList");

const profileSchema = Joi.object({
  descripcion: Joi.string().allow("").optional(),

  // Aptitudes deben ser de la lista predefinida
  aptitudes: Joi.array().items(Joi.string().valid(...skillsList)).default([]),

  experiencia: Joi.array().items(Joi.string().allow("")).default([]),
  educacion: Joi.array().items(Joi.string().allow("")).default([]),

  foto_perfil: Joi.string().uri().allow(null, "").optional(),
});

module.exports = { profileSchema };