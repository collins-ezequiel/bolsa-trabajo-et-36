// controllers/matchController.js
const { prisma } = require('../../prisma/client');

const compareProfileToOffer = async (req, res) => {
    try {
        const ofertaId = Number(req.params.ofertaId);
        const userId = req.user.id;

        const oferta = await prisma.ofertaslaborales.findUnique({
            where: { id: ofertaId }
        });

        if (!oferta) return res.status(404).json({ error: 'Oferta no encontrada' });

        const perfil = await prisma.perfiles.findFirst({
            where: { usuario_id: userId }
        });

        if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });

        const requisitos = oferta.requisitos || [];
        const aptitudes = perfil.aptitudes || [];

        const detalle = requisitos.map(req => ({
            requisito: req,
            cumple: aptitudes.includes(req)
        }));

        const coincidencias = detalle.filter(d => d.cumple).length;
        const resultado = {
            coincidencias,
            totalRequisitos: requisitos.length,
            cumpleCon: requisitos.length > 0 ? Math.round((coincidencias / requisitos.length) * 100) : 0,
            detalle
        };

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { compareProfileToOffer };