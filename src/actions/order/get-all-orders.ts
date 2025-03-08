'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getAllPaidOrders = async () => {
  const session = await auth();
  if (session?.user.role === 'user') {
    return {
      ok: false,
      message: 'No tienes los permisos para ver',
    };
  }
  try {
    const orders = await prisma.order.findMany({
      where: { isPaid: true },
      include: {
        user: {
          select: { name: true, image: true, email: true },
        },
      },
    });
    return {
      ok: true,
      orders,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Error al obtener las ordenes pagadas`,
    };
  }
};
