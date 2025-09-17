const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../../prisma/client.js');

// Registro
const register = async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, rol } = req.body;

    const existingUser = await prisma.usuarios.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const user = await prisma.usuarios.create({
      data: {
        nombre,
        apellido,
        email,
        contrase_a: hashedPassword,
        rol,
      }
    });

    res.status(201).json({ message: 'Usuario creado', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const user = await prisma.usuarios.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contrase_a);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }

    const payload = {
      id: user.id, // Ahora es tipo Number
      rol: user.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
