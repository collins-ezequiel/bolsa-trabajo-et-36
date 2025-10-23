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

        const aptitudesOferta = oferta.requisitos || []; 
        const aptitudesUsuario = perfil.aptitudes || [];

        const detalle = aptitudesOferta.map(skill => ({
            aptitud: skill,
            cumple: aptitudesUsuario.includes(skill)
        }));

        const coincidencias = detalle.filter(d => d.cumple).length;
        const porcentaje = aptitudesOferta.length > 0
            ? Math.round((coincidencias / aptitudesOferta.length) * 100)
            : 0;

        return res.status(200).json({ coincidencias, porcentaje, detalle });
    } catch (error) {
        console.error("Error comparando perfil con oferta:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    compareProfileToOffer,
};
