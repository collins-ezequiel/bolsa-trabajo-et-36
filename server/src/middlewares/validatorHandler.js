// middlewares/validatorHandler.js
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Error de validación en el body',
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Error de validación en los params',
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Error de validación en los query params',
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

module.exports = {
  validateBody,
  validateParams,
  validateQuery,
};
