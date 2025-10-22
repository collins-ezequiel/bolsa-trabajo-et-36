const { prisma } = require('../../prisma/client');

// Crear oferta
const createOffer = async (data, empresaId) => {
  return await prisma.ofertaslaborales.create({
    data: {
      titulo: data.titulo,
      descripcion: data.descripcion,
      requisitos: data.requisitos,
      ubicacion: data.ubicacion,
      empresa_id: empresaId,
    },
  });
};

// Todas las ofertas
const getAllOffers = async () => {
  return await prisma.ofertaslaborales.findMany({
    include: {
      usuarios: {
        select: { nombre: true, apellido: true }
      },
      postulaciones: true,
    },
  });
};

// Una oferta
const getOfferById = async (id) => {
  return await prisma.ofertaslaborales.findUnique({
    where: { id: Number(id) },
    include: { usuarios: true, postulaciones: true },
  });
};

// Obtener mis ofertas
const getMyOffers = async (empresaId) => {
  return await prisma.ofertaslaborales.findMany({
    where: { empresa_id: empresaId },
    include: {
      postulaciones: {
        include: {
          usuarios: true,
        },
      },
    },
  });
};

// Actualizar
const updateOffer = async (id, data) => {
  return await prisma.ofertaslaborales.update({
    where: { id: Number(id) },
    data,
  });
};

// Eliminar
const deleteOffer = async (id) => {
  return await prisma.ofertaslaborales.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  getMyOffers,
  updateOffer,
  deleteOffer
};
