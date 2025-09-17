const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear usuarios tipo empresa y usuarios normales
  const empresa1 = await prisma.usuarios.create({
    data: {
      nombre: 'Empresa Uno',
      apellido: '',
      email: 'empresa1@empresa.com',
      contrase_a: 'pass123',
      rol: 'EMPRESA',
      titulo_validado: true,
    },
  });

  const usuario1 = await prisma.usuarios.create({
    data: {
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan.perez@email.com',
      contrase_a: 'pass123',
      rol: 'USER',
      titulo_validado: false,
    },
  });

  // Crear perfil para usuario1
  const perfil1 = await prisma.perfiles.create({
    data: {
      usuario_id: usuario1.id,
      descripcion: 'Desarrollador Full Stack con 5 años de experiencia',
      aptitudes: ['JavaScript', 'Node.js', 'React'],
      experiencia: '5 años en desarrollo web',
      educacion: 'Ingeniería en Sistemas',
      foto_perfil: null,
    },
  });

  // Crear ofertas laborales asociadas a empresa1
  const oferta1 = await prisma.ofertaslaborales.create({
    data: {
      empresa_id: empresa1.id,
      titulo: 'Desarrollador Backend',
      descripcion: 'Desarrollo de APIs con Node.js y Prisma',
      requisitos: ['Node.js', 'Prisma', 'PostgreSQL'],
      ubicacion: 'Remoto',
    },
  });

  const oferta2 = await prisma.ofertaslaborales.create({
    data: {
      empresa_id: empresa1.id,
      titulo: 'Frontend Developer',
      descripcion: 'Desarrollo de interfaces con React',
      requisitos: ['React', 'JavaScript', 'CSS'],
      ubicacion: 'Buenos Aires',
    },
  });

  // Crear una postulación de usuario1 a oferta1
  const postulacion1 = await prisma.postulaciones.create({
    data: {
      usuario_id: usuario1.id,
      oferta_id: oferta1.id,
      estado: 'Pendiente',
    },
  });

  console.log('Seed finalizado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
