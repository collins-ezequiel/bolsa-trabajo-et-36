// services/validationService.js
const { prisma } = require('../../prisma/client');

const createValidation = async (data) => {
    return await prisma.validaciones.create({ data });
};

const getAllValidations = async () => {
    return await prisma.validaciones.findMany({ include: { usuarios: true } });
};

const getValidationById = async (id) => {
    return await prisma.validaciones.findUnique({
        where: { id: Number(id) },
        include: { usuarios: true }
    });
};

const updateValidation = async (id, data) => {
    return await prisma.validaciones.update({
        where: { id: Number(id) },
        data
    });
};

module.exports = {
    createValidation,
    getAllValidations,
    getValidationById,
    updateValidation
};