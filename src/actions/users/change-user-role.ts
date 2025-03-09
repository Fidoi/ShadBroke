'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    return {
      ok: false,
      message: 'No tienes permisos de administrador',
    };
  }
  const validRoles = ['admin', 'supervisor', 'user'];
  if (!validRoles.includes(role)) {
    return {
      ok: false,
      message: 'Rol no válido',
    };
  }
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role as Role,
      },
    });

    revalidatePath('/profile/admin/users');
    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el rol, revisar logs',
    };
  }
};
