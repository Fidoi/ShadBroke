'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';

export async function registerUser(
  email: string,
  password: string,
  name: string
) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) throw new Error('El usuario ya existe');

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    return 'Credenciales inválidas';
  }
}
