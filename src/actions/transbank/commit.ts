'use server';

import prisma from '@/lib/prisma';

export async function commitWebpayTransaction(token: string) {
  try {
    // Validar formato del token
    if (!/^[a-zA-Z0-9]{64}$/.test(token)) {
      throw new Error('Token inválido');
    }

    // Verificar en base de datos
    const transaction = await prisma.transaction.findUnique({
      where: { token, status: 'PENDING' },
    });

    if (!transaction) {
      throw new Error('Transacción no encontrada o ya confirmada');
    }

    // Confirmar con Transbank
    const transbankResponse = await fetch(
      `https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
      {
        method: 'PUT',
        headers: {
          'Tbk-Api-Key-Id': process.env.TRANBANK_COMMERCE_CODE!,
          'Tbk-Api-Key-Secret': process.env.TRANBANK_API_KEY!,
        },
      }
    );

    const data = await transbankResponse.json();

    // Actualizar estado en DB
    await prisma.transaction.update({
      where: { token },
      data: { status: data.status },
    });

    return data;
  } catch (error) {
    throw new Error(
      `Error al confirmar transacción: ${(error as Error).message}`
    );
  }
}
