'use client';
import { startWebpayTransaction } from '@/actions';

export async function handleWebPayPayment(
  amount: number,
  orderId: string
): Promise<void> {
  try {
    const { url, token } = await startWebpayTransaction(amount, orderId);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token_ws';
    tokenInput.value = token;

    form.appendChild(tokenInput);
    document.body.appendChild(form);
    form.submit();
  } catch (error) {
    console.error(error);
    alert('Error al iniciar el pago');
  }
}
