'use server';

import prisma from '@/lib/prisma';

export async function startWebpayTransaction(amount: number, orderId: string) {
  try {
    if (isNaN(amount) || amount <= 0 || !orderId.trim()) {
      throw new Error(
        'Parámetros inválidos: amount debe ser mayor a 0 y orderId no puede estar vacío'
      );
    }

    const payload = {
      buy_order: orderId,
      session_id: crypto.randomUUID(),
      amount: Math.round(amount),
      return_url: `${process.env.NEXTAUTH_URL}/pago/resultado`,
    };

    // Llamada a Transbank con manejo de errores
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

    // Validar estructura de la respuesta
    if (!data.token || typeof data.token !== 'string') {
      throw new Error('Respuesta inválida de Transbank: Token no recibido');
    }

    // Guardar en base de datos con validación
    const createdTransaction = await prisma.transaction.create({
      data: {
        token: data.token,
        amount: payload.amount,
        orderId: orderId,
      },
    });

    return {
      url: data.url,
      token: data.token,
      dbRecord: createdTransaction, // Opcional: para debugging
    };
  } catch (error) {
    console.error('Error detallado:', error);
    throw new Error(
      `Error al iniciar transacción: ${(error as Error).message}`
    );
  }
}
