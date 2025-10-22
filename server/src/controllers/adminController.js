const { prisma } = require("../../prisma/client");

// 🔹 Listar todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.usuarios.findMany({
            include: {
                perfiles: true,
            },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Listar todas las validaciones
const getAllValidations = async (req, res) => {
    try {
        const validations = await prisma.validaciones.findMany({
            include: {
                usuarios: true,
            },
        });
        res.json(validations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Actualizar estado de validación
const updateValidation = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        if (!["Pendiente", "Aprobada", "Rechazada"].includes(estado)) {
            return res.status(400).json({ error: "Estado inválido" });
        }

        const updated = await prisma.validaciones.update({
            where: { id: Number(id) },
            data: { estado },
            include: { usuarios: true },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getAllValidations,
    updateValidation
};

