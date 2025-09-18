const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/auth');
const offersRoutes = require('./routes/offers');
const postulationsRoutes = require('./routes/postulations');
const profilesRoutes = require('./routes/profiles');
const validationRoutes = require('./routes/validations');
const matchRoutes = require('./routes/match');
const searchOffersRoutes = require('./routes/searchOffers');
const searchProfilesRoutes = require('./routes/searchProfiles');

app.use('/api/auth', authRoutes);
app.use('/api/ofertas', offersRoutes);
app.use('/api/postulations', postulationsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/validations', validationRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/searchOffers', searchOffersRoutes);
app.use('/api/searchProfiles', searchProfilesRoutes);


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
