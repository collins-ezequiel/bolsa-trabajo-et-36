const Joi = require('joi'); // Corrige el nombre del import

const name = Joi.string().min(3).max(50);
const email = Joi.string().email();
const password = Joi.string().min(8);

const userSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
}).options({
  abortEarly: false, // Para que retorne todos los errores de validación
  allowUnknown: false, // Permite campos desconocidos
});

const idUserSchema = Joi.object({
  id: Joi.number().integer().required(),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

module.exports = { userSchema, idUserSchema }; // Exporta el esquema para usarlo en otros archivos
