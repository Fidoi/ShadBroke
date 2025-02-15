'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin' && session?.user.role !== 'supervisor') {
    return {
      ok: false,
      message: 'Debe de ser un usuario administrador',
    };
  }

  const adminId = session.user.id;

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  const adminIndex = users.findIndex((user) => user.id === adminId);
  let orderedUsers = users;

  if (adminIndex !== -1) {
    const adminUser = users[adminIndex];
    orderedUsers = [
      adminUser,
      ...users.slice(0, adminIndex),
      ...users.slice(adminIndex + 1),
    ];
  }

  return {
    ok: true,
    users: orderedUsers,
  };
};
