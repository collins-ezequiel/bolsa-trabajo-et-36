// controllers/profilesController.js
const { prisma } = require('../../prisma/client');

const createProfile = async (req, res) => {
    try {
        const profile = await prisma.perfiles.create({
            data: {
                usuario_id: req.user.id,
                descripcion: req.body.descripcion,
                aptitudes: req.body.aptitudes || [],
                experiencia: req.body.experiencia,
                educacion: req.body.educacion,
                foto_perfil: req.body.foto_perfil || null
            }
        });
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProfileByUserId = async (req, res) => {
    try {
        const profile = await prisma.perfiles.findFirst({
            where: { usuario_id: req.user.id },
            include: { usuarios: true }
        });
        if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updated = await prisma.perfiles.updateMany({
            where: { usuario_id: req.user.id },
            data: {
                descripcion: req.body.descripcion,
                aptitudes: req.body.aptitudes,
                experiencia: req.body.experiencia,
                educacion: req.body.educacion,
                foto_perfil: req.body.foto_perfil
            }
        });
        if (updated.count === 0) return res.status(404).json({ error: 'Perfil no encontrado' });
        res.json({ message: 'Perfil actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProfile,
    getProfileByUserId,
    updateProfile
};