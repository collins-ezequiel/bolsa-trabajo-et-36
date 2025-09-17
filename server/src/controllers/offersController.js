const offerService = require('../services/offersService');

const createOffer = async (req, res) => {
  try {
    const nuevaOferta = await offerService.createOffer(req.body);
    res.status(201).json(nuevaOferta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOffers = async (req, res) => {
  try {
    const ofertas = await offerService.getAllOffers();
    res.json(ofertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOfferById = async (req, res) => {
  try {
    const oferta = await offerService.getOfferById(req.params.id);
    if (!oferta) return res.status(404).json({ error: 'No encontrada' });
    res.json(oferta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOffer = async (req, res) => {
  try {
    const ofertaActualizada = await offerService.updateOffer(req.params.id, req.body);
    res.json(ofertaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOffer = async (req, res) => {
  try {
    await offerService.deleteOffer(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer
};
