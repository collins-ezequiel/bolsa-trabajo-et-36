const { prisma } = require('../../prisma/client.js');

const createOffer = async ({ empresaId, titulo, descripcion, requisitos, ubicacion }) => {
  return await prisma.ofertaslaborales.create({
    data: {
      empresa_id: Number(empresaId),
      titulo,
      descripcion,
      requisitos,
      ubicacion
    }
  });
};

const getAllOffers = async () => {
  return await prisma.ofertaslaborales.findMany({
    include: { usuarios: true }
  });
};

const getOfferById = async (id) => {
  return await prisma.ofertaslaborales.findUnique({
    where: { id: Number(id) },
    include: { usuarios: true }
  });
};

const updateOffer = async (id, { titulo, descripcion, requisitos, ubicacion }) => {
  return await prisma.ofertaslaborales.update({
    where: { id: Number(id) },
    data: {
      titulo,
      descripcion,
      requisitos,
      ubicacion,
      updated_at: new Date()
    }
  });
};

const deleteOffer = async (id) => {
  return await prisma.ofertaslaborales.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer
};
