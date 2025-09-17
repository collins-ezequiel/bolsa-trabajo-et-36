const Joi = require('joi');

const ofertaSchema = Joi.object({
  titulo: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().min(10).required(),
  empresaId: Joi.number().integer().required(),
  ubicacion: Joi.string().required(),
  requisitos: Joi.array().items(Joi.string()).required(),
  salario: Joi.number().min(0)
});

const idOfferSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

module.exports = {
  ofertaSchema,
  idOfferSchema
};
