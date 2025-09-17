// services/profilesService.js
const { prisma } = require('../../prisma/client');

const createProfile = async (data) => {
    return await prisma.perfiles.create({ data });
};

const getProfileByUserId = async (userId) => {
    return await prisma.perfiles.findFirst({
        where: { usuario_id: userId },
        include: { usuarios: true }
    });
};

const updateProfile = async (userId, data) => {
    return await prisma.perfiles.updateMany({
        where: { usuario_id: userId },
        data
    });
};

module.exports = {
    createProfile,
    getProfileByUserId,
    updateProfile
};
