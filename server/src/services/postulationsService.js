// services/postulationsService.js
const { prisma } = require('../../prisma/client');

const createPostulation = async ({ usuario_id, oferta_id, mensaje }) => {
    return await prisma.postulaciones.create({
        data: {
            usuario_id: Number(usuario_id),
            oferta_id: Number(oferta_id),
            mensaje: mensaje || null
        }
    });
};

const getAllPostulations = async () => {
    return await prisma.postulaciones.findMany({
        include: { usuarios: true, ofertaslaborales: true }
    });
};

const getPostulationById = async (id) => {
    return await prisma.postulaciones.findUnique({
        where: { id: Number(id) },
        include: { usuarios: true, ofertaslaborales: true }
    });
};

const deletePostulation = async (id) => {
    return await prisma.postulaciones.delete({
        where: { id: Number(id) }
    });
};

module.exports = {
    createPostulation,
    getAllPostulations,
    getPostulationById,
    deletePostulation
};