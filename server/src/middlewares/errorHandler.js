const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(
    `[ERROR] [${new Date().toLocaleString()}] - ${statusCode} - ${message}`
  );

  if (err.stack) {
    console.error(err.stack);
  }
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.NODE_ENV === 'development' && { stack: err.stack }),
  });
  next();
};

module.exports = errorHandler;
// Este middleware maneja los errores de la aplicación, registrando el error en la consola y enviando una respuesta JSON al cliente.
// Si el entorno es de desarrollo, también incluye la pila del error en la respuesta para facilitar la depuración.
// Se utiliza para capturar errores que ocurren en las rutas o en otros middlewares y enviar una respuesta adecuada al cliente.
// Se debe incluir en la cadena de middlewares después de todos los demás middlewares y rutas para que pueda capturar cualquier error que ocurra.
