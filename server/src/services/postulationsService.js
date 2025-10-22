// src/services/postulationsService.js
const { prisma } = require("../../prisma/client");

const createPostulation = async (usuarioId, ofertaId) => {
    return await prisma.postulaciones.create({
        data: {
            usuario_id: Number(usuarioId),
            oferta_id: Number(ofertaId),
            estado: "pendiente",
        },
    });
};

const getAllPostulations = async () => {
    return await prisma.postulaciones.findMany({
        include: { usuarios: true, ofertaslaborales: true },
    });
};

const getPostulationById = async (id) => {
    return await prisma.postulaciones.findUnique({
        where: { id: Number(id) },
        include: { usuarios: true, ofertaslaborales: true },
    });
};

const updatePostulation = async (id, estado) => {
    return await prisma.postulaciones.update({
        where: { id: Number(id) },
        data: { estado },
    });
};

const deletePostulation = async (id) => {
    return await prisma.postulaciones.delete({
        where: { id: Number(id) },
    });
};

const getMyPostulations = async (usuarioId) => {
    return await prisma.postulaciones.findMany({
        where: { usuario_id: Number(usuarioId) },
        include: {
            ofertaslaborales: { include: { usuarios: true } }, // empresa dueña
        },
        orderBy: { id: "desc" },
    });
};

module.exports = {
    createPostulation,
    getAllPostulations,
    getPostulationById,
    updatePostulation,
    deletePostulation,
    getMyPostulations,
};
