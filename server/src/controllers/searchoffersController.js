// controllers/searchOffersController.js
const { prisma } = require('../../prisma/client');

const searchOffers = async (req, res) => {
    try {
        const userId = req.user.id;

        const perfil = await prisma.perfiles.findFirst({
            where: { usuario_id: userId }
        });

        if (!perfil || !perfil.aptitudes || perfil.aptitudes.length === 0) {
            return res.status(200).json([]);
        }

        const aptitudes = perfil.aptitudes.map(a => a.toLowerCase());

        const ofertas = await prisma.ofertaslaborales.findMany({
            include: { usuarios: true }
        });

        // Match inteligente: comparar cada oferta
        const ofertasConMatch = ofertas
            .map(oferta => {
                const requisitos = (oferta.requisitos || []).map(r => r.toLowerCase());
                const coincidencias = aptitudes.filter(a => requisitos.includes(a));
                return {
                    ...oferta,
                    coincidencias: coincidencias.length,
                    aptitudes_matcheadas: coincidencias
                };
            })
            .filter(oferta => oferta.coincidencias > 0) // Mostrar solo ofertas relevantes
            .sort((a, b) => b.coincidencias - a.coincidencias); // Ordenar por coincidencias desc

        res.json(ofertasConMatch);
    } catch (error) {
        console.error('Error en búsqueda de ofertas:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { searchOffers };