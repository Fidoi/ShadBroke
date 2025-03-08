'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export async function startWebpayTransaction(amount: number, orderId: string) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    };
  }
  try {
    if (isNaN(amount) || amount <= 0 || !userId.trim()) {
      throw new Error(
        'Parámetros inválidos: amount debe ser mayor a 0 y userId no puede estar vacío'
      );
    }

    const payload = {
      buy_order: orderId,
      session_id: crypto.randomUUID(),
      amount: Math.round(amount),
      return_url: `${process.env.NEXTAUTH_URL}/orders/${orderId}`,
    };

    const transbankResponse = await fetch(
      `https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Tbk-Api-Key-Id': process.env.TRANBANK_COMMERCE_CODE!,
          'Tbk-Api-Key-Secret': process.env.TRANBANK_API_KEY!,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!transbankResponse.ok) {
      const errorData = await transbankResponse.json();
      throw new Error(`Transbank API Error: ${JSON.stringify(errorData)}`);
    }

    const data = await transbankResponse.json();

    if (!data.token || typeof data.token !== 'string') {
      throw new Error('Respuesta inválida de Transbank: Token no recibido');
    }

    const order = await prisma.order.findFirst({
      where: {
        userId,
        isPaid: false,
      },
    });

    if (!order) {
      throw new Error('No se encontró una orden pendiente para el usuario');
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { transactionId: data.token },
    });

    return {
      url: data.url,
      token: data.token,
      dbRecord: updatedOrder,
    };
  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error(
      `Error al iniciar transacción: ${(error as Error).message}`
    );
  }
}
