-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'EMPRESA', 'USUARIO');

-- CreateTable
CREATE TABLE "ofertaslaborales" (
    "id" SERIAL NOT NULL,
    "empresa_id" INTEGER,
    "titulo" TEXT,
    "descripcion" TEXT,
    "requisitos" TEXT[],
    "fecha_publicacion" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ubicacion" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ofertaslaborales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfiles" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "descripcion" TEXT,
    "aptitudes" TEXT[],
    "experiencia" TEXT[],
    "educacion" TEXT[],
    "foto_perfil" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postulaciones" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "oferta_id" INTEGER,
    "fecha_postulacion" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postulaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "email" TEXT,
    "contraseña" TEXT,
    "rol" "role",
    "titulo_validado" BOOLEAN,
    "fecha_registro" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validaciones" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "titulo" TEXT,
    "estado" TEXT,
    "fecha_validacion" TIMESTAMPTZ(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "validaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "ofertaslaborales" ADD CONSTRAINT "ofertaslaborales_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perfiles" ADD CONSTRAINT "perfiles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_oferta_id_fkey" FOREIGN KEY ("oferta_id") REFERENCES "ofertaslaborales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "validaciones" ADD CONSTRAINT "validaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
