// controllers/validationController.js
const { prisma } = require('../../prisma/client');

const createValidation = async (req, res) => {
    try {
        const validation = await prisma.validaciones.create({
            data: {
                usuario_id: req.body.usuario_id,
                titulo: req.body.titulo,
                estado: req.body.estado || 'pendiente',
                fecha_validacion: new Date()
            }
        });
        res.status(201).json(validation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllValidations = async (req, res) => {
    try {
        const validations = await prisma.validaciones.findMany({
            include: { usuarios: true }
        });
        res.json(validations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getValidationById = async (req, res) => {
    try {
        const validation = await prisma.validaciones.findUnique({
            where: { id: Number(req.params.id) },
            include: { usuarios: true }
        });
        if (!validation) return res.status(404).json({ error: 'No encontrada' });
        res.json(validation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateValidation = async (req, res) => {
    try {
        const updated = await prisma.validaciones.update({
            where: { id: Number(req.params.id) },
            data: {
                estado: req.body.estado
            }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createValidation,
    getAllValidations,
    getValidationById,
    updateValidation
};