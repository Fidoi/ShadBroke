'use server';

import prisma from '@/lib/prisma';

export async function getAllTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return {
      success: true,
      data: transactions.map((t) => ({
        orderId: t.orderId,
        amount: t.amount,
        status: t.status,
        createdAt: t.createdAt,
        token: t.token,
      })),
    };
  } catch (error) {
    console.error('Error obteniendo transacciones:', error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
