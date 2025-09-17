const express = require('express'); 
const app = express();

// Middlewares personalizados
const loggerMiddleware = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Middleware para manejar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use(loggerMiddleware);

// Rutas
const apiRoutes = require('./routes');
apiRoutes(app); // Esto monta tus rutas, como /api/ofertas, etc.

// Servir archivos estáticos (por si tenés frontend)
app.use(express.static('public'));

// Configurar EJS como motor de vistas (si usás vistas)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware de manejo de errores (al final)
app.use(errorHandler);

module.exports = app;
