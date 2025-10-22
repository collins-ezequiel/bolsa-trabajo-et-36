// src/controllers/postulationsController.js
const postulationService = require("../services/postulationsService");

// Crear (USUARIO)
const createPostulation = async (req, res) => {
    try {
        const { oferta_id } = req.body;
        if (!oferta_id) return res.status(400).json({ error: "oferta_id requerido" });

        // Evitar duplicado del mismo usuario en la misma oferta (opcional si ya lo tenías)
        // const exists = await postulationService.findByUserAndOffer(req.user.id, oferta_id);
        // if (exists) return res.status(400).json({ error: "Ya estás postulado a esta oferta" });

        const created = await postulationService.createPostulation(req.user.id, oferta_id);
        return res.status(201).json(created);
    } catch (error) {
        console.error("createPostulation:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Todas (ADMIN, EMPRESA)
const getAllPostulations = async (_req, res) => {
    try {
        const rows = await postulationService.getAllPostulations();
        return res.json(rows);
    } catch (error) {
        console.error("getAllPostulations:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Una
const getPostulationById = async (req, res) => {
    try {
        const row = await postulationService.getPostulationById(req.params.id);
        if (!row) return res.status(404).json({ error: "No encontrada" });
        return res.json(row);
    } catch (error) {
        console.error("getPostulationById:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Actualizar estado (EMPRESA, ADMIN)
const updatePostulation = async (req, res) => {
    try {
        const { estado } = req.body;
        if (!estado) return res.status(400).json({ error: "estado requerido" });
        const row = await postulationService.updatePostulation(req.params.id, estado);
        return res.json(row);
    } catch (error) {
        console.error("updatePostulation:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Borrar (dueño o ADMIN)
const deletePostulation = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const found = await postulationService.getPostulationById(id);
        if (!found) return res.status(404).json({ error: "No encontrada" });

        if (req.user.rol !== "ADMIN" && found.usuario_id !== Number(req.user.id)) {
            return res.status(403).json({ error: "No autorizado" });
        }
        await postulationService.deletePostulation(id);
        return res.status(204).send();
    } catch (error) {
        console.error("deletePostulation:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Mis postulaciones (USUARIO)
const getMyPostulations = async (req, res) => {
    try {
        const rows = await postulationService.getMyPostulations(req.user.id);
        return res.json(rows);
    } catch (error) {
        console.error("getMyPostulations:", error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPostulation,
    getAllPostulations,
    getPostulationById,
    updatePostulation,
    deletePostulation,
    getMyPostulations,
};
