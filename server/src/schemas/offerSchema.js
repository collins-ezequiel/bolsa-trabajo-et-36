const Joi = require('joi');
const skillsList = require("../utils/skillsList");

const ofertaSchema = Joi.object({
  titulo: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().min(10).required(),
  ubicacion: Joi.string().required(),
  requisitos: Joi.array().items(Joi.string().valid(...skillsList)).required(),
});

const idOfferSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
  ofertaSchema,
  idOfferSchema,
};
