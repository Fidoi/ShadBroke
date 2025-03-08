'use server';

import prisma from '@/lib/prisma';

export async function commitWebpayTransaction(orderId: string, token: string) {
  try {
    if (!/^[a-zA-Z0-9]{64}$/.test(token)) {
      throw new Error('Token inválido');
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('Orden no encontrada');
    }

    const transbankResponse = await fetch(
      `https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Tbk-Api-Key-Id': process.env.TRANBANK_COMMERCE_CODE!,
          'Tbk-Api-Key-Secret': process.env.TRANBANK_API_KEY!,
        },
      }
    );

    if (!transbankResponse.ok) {
      const errorData = await transbankResponse.json();
      throw new Error(`Transbank API Error: ${JSON.stringify(errorData)}`);
    }

    const data = await transbankResponse.json();

    if (data.response_code !== 0) {
      throw new Error(
        `Transacción no autorizada: código ${data.response_code} – ${data.status}`
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        isPaid: true,
        paidAt: new Date(),
        transactionId: token,
      },
    });

    return { transbankData: data, order: updatedOrder };
  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error(
      `Error al confirmar transacción: ${(error as Error).message}`
    );
  }
}
