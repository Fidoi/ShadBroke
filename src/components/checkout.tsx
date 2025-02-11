'use client';

import { startWebpayTransaction } from '@/actions/transbank/start';
import { useState } from 'react';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const { url, token } = await startWebpayTransaction(10000, 'orden-123');

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className='bg-blue-500 text-white p-4 rounded-lg'
    >
      {isLoading ? 'Procesando...' : 'Pagar $10,000'}
    </button>
  );
}
