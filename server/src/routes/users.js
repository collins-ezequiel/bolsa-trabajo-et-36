const express = require('express');
const router = express.Router();

const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const { authenticateToken, checkRoles } = require('../middlewares/auth');
const {
  validateUserSchema,
  validateIdUserSchema,
} = require('../middlewares/validatorHandler');

const bcrypt = require('bcryptjs');

router.get('/get', authenticateToken, checkRoles('ADMIN'), (req, res) => {
  prisma.user
    .findMany()
    .then((users) => {
      res.status(200).json({
        users: users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.rol,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
      });
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
      res.status(500).json({
        error: 'An error occurred while fetching users from the database',
      });
    });
});

router.put(
  '/update/:id',
  validateIdUserSchema,
  validateUserSchema,
  authenticateToken,
  checkRoles('ADMIN'),
  async (req, res) => {
    const { id } = req.params;
    let { name, email, password } = req.body;
    try {
      // Verifica si el usuario existe
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        password = hashedPassword;
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email, password },
      });

      res.status(200).json({
        message: 'User updated successfully',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        error: 'An error occurred while updating the user',
      });
    }
  }
);

router.delete(
  '/delete/:id',
  validateIdUserSchema,
  authenticateToken,
  checkRoles('ADMIN'),
  async (req, res) => {
    const { id } = req.params;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      res
        .status(200)
        .json({ message: 'User deleted successfully', userId: parseInt(id) });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        error: 'An error occurred while deleting the user',
      });
    }
  }
);

module.exports = router;
