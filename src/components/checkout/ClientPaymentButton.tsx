'use client';

import { handleWebPayPayment } from '@/actions';
import { Button } from '../ui/button';

interface ClientPaymentButtonProps {
  amount: number;
  orderId: string;
}

export function ClientPaymentButton({
  amount,
  orderId,
}: ClientPaymentButtonProps) {
  const onClick = async () => {
    await handleWebPayPayment(amount, orderId);
  };

  return (
    <>
      <Button onClick={onClick}>Ir a Pagar</Button>
    </>
  );
}
