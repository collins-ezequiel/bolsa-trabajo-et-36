const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const offersRoutes = require('./routes/offers');
const postulationsRoutes = require('./routes/postulations');
const profilesRoutes = require('./routes/profiles');
const validationRoutes = require('./routes/validations');
const matchRoutes = require('./routes/match');
const searchOffersRoutes = require('./routes/searchOffers');
const searchProfilesRoutes = require('./routes/searchProfiles');
const adminRoutes = require('./routes/admin');


app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/ofertas', offersRoutes); // Rutas de ofertas
app.use('/api/postulations', postulationsRoutes); // Rutas de postulaciones
app.use('/api/profiles', profilesRoutes); // Rutas de perfiles
app.use('/api/validations', validationRoutes); // Rutas de validaciones
app.use('/api/match', matchRoutes); // Rutas de match
app.use('/api/searchOffers', searchOffersRoutes); // Rutas de búsqueda de ofertas
app.use('/api/searchProfiles', searchProfilesRoutes); // Rutas de búsqueda de perfiles
app.use('/api/admin', adminRoutes); // Rutas de administración


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
