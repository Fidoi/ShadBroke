'use server';

import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function registerUser(
  email: string,
  password: string,
  name?: string
) {
  // Validaciones básicas
  if (!email || !password) {
    throw new Error('El correo y la contraseña son obligatorios');
  }

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  // Hashear la contraseña
  const hashedPassword = await hash(password, 10);

  // Crear el usuario en la DB
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return newUser;
}
