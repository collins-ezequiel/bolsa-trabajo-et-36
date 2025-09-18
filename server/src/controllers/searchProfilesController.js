// controllers/searchProfilesController.js
const { prisma } = require('../../prisma/client');

const searchProfiles = async (req, res) => {
    try {
        const keyword = req.query.keyword?.toLowerCase();

        const perfiles = await prisma.perfiles.findMany({
            include: { usuarios: true }
        });

        if (!keyword) return res.json(perfiles);

        const filtered = perfiles.filter(p => {
            const aptitudes = p.aptitudes?.map(a => a.toLowerCase()) || [];
            const descripcion = p.descripcion?.toLowerCase() || '';
            const experiencia = p.experiencia?.toLowerCase() || '';
            const educacion = p.educacion?.toLowerCase() || '';

            return (
                aptitudes.includes(keyword) ||
                descripcion.includes(keyword) ||
                experiencia.includes(keyword) ||
                educacion.includes(keyword)
            );
        });

        res.json(filtered);
    } catch (error) {
        console.error('Error al buscar perfiles:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { searchProfiles };