// controllers/searchOffersController.js
const { prisma } = require('../../prisma/client');

const searchOffers = async (req, res) => {
    try {
        const userId = req.user.id;

        // Buscar el perfil del usuario
        const perfil = await prisma.perfiles.findUnique({
            where: { usuario_id: userId }
        });

        if (!perfil) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
        }

        const aptitudes = perfil.aptitudes || [];

        if (aptitudes.length === 0) {
            return res.status(200).json([]); // Sin aptitudes, no hay coincidencias
        }

        // Buscar ofertas que contengan al menos una de las aptitudes
        const ofertas = await prisma.ofertaslaborales.findMany({
            where: {
                requisitos: {
                    hasSome: aptitudes // ← esto filtra por coincidencia de array
                }
            },
            include: {
                usuarios: true
            }
        });

        res.json(ofertas);
    } catch (error) {
        console.error('Error en búsqueda de ofertas:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { searchOffers };