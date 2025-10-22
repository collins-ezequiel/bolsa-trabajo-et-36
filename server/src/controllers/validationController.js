// controllers/validationController.js
const { prisma } = require('../../prisma/client');

// Crear validación (Alumno o Empresa)
const createValidation = async (req, res) => {
    try {
        const validation = await prisma.validaciones.create({
            data: {
                usuario_id: req.user.id, // 👈 se toma del token
                titulo: req.body.titulo,
                estado: 'pendiente',
                fecha_validacion: new Date()
            }
        });
        res.status(201).json(validation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: ver todas
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

// Alumno/Empresa: ver solo las suyas
const getMyValidations = async (req, res) => {
    try {
        const validations = await prisma.validaciones.findMany({
            where: { usuario_id: req.user.id },
            include: { usuarios: true } // 👈 mantenemos relación
        });
        res.json(validations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener validación por id
const getValidationById = async (req, res) => {
    try {
        const validation = await prisma.validaciones.findUnique({
            where: { id: Number(req.params.id) },
            include: { usuarios: true }
        });

        if (!validation) return res.status(404).json({ error: 'No encontrada' });

        // Solo admin o dueño pueden verla
        if (req.user.rol !== 'ADMIN' && validation.usuario_id !== req.user.id) {
            return res.status(403).json({ error: 'No autorizado' });
        }

        res.json(validation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin actualiza estado
const updateValidation = async (req, res) => {
    try {
        const { estado } = req.body;
        const validationId = Number(req.params.id);

        const updatedValidation = await prisma.validaciones.update({
            where: { id: validationId },
            data: { estado }
        });

        // Si fue aprobado, actualizar usuario
        if (estado === 'aprobado') {
            await prisma.usuarios.update({
                where: { id: updatedValidation.usuario_id },
                data: { titulo_validado: true }
            });
        }

        res.json(updatedValidation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createValidation,
    getAllValidations,
    getMyValidations,
    getValidationById,
    updateValidation,
};
