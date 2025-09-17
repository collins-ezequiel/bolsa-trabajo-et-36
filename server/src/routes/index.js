const ofertasRoutes = require('./offers');

module.exports = (app) => {
  app.use('/api/ofertas', ofertasRoutes);
};
