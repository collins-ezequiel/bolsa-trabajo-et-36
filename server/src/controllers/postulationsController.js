// controllers/postulationsController.js
const { prisma } = require('../../prisma/client');

const createPostulation = async (req, res) => {
    try {
        const postulation = await prisma.postulaciones.create({
            data: {
                estado: req.body.estado || 'pendiente',
                usuarios: {
                    connect: { id: req.user.id }
                },
                ofertaslaborales: {
                    connect: { id: req.body.oferta_id }
                }
            }
        });
        res.status(201).json(postulation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPostulations = async (req, res) => {
    try {
        const postulations = await prisma.postulaciones.findMany({
            include: { usuarios: true, ofertaslaborales: true }
        });
        res.json(postulations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostulationById = async (req, res) => {
    try {
        const postulation = await prisma.postulaciones.findUnique({
            where: { id: Number(req.params.id) },
            include: { usuarios: true, ofertaslaborales: true }
        });
        if (!postulation) return res.status(404).json({ error: 'No encontrada' });
        res.json(postulation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePostulation = async (req, res) => {
    try {
        await prisma.postulaciones.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPostulation, getAllPostulations, getPostulationById, deletePostulation };