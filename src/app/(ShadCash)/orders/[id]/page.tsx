import { commitWebpayTransaction, getOrderById } from '@/actions';
import { Button, Card, CardTitle } from '@/components';

import { currencyFormat } from '@/utils';
import Link from 'next/link';
import { HandleClearCart } from './ui/clearCart';
import { CircleCheckBig, CircleX } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ token_ws?: string }>;
}
export default async function OrderPaidPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Props) {
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const orderId = params.id;
  const token = searchParams?.token_ws;

  if (!orderId) {
    return notFound();
  }

  if (!token) {
    return notFound();
  }

  try {
    await commitWebpayTransaction(orderId, token);
  } catch (error) {
    return (
      <div className=' min-h-screen flex items-center justify-center p-4'>
        <HandleClearCart />
        <Card className=' rounded shadow p-8 max-w-lg w-full'>
          <CardTitle className='flex justify-center'>
            <CircleX color='#d10000' className='mr-3' size={30} />
            <h1 className='text-2xl font-bold text-center mb-4 '>
              Pago Rechazado - Pendiente
            </h1>
          </CardTitle>

          <p className='text-center mb-6'>{(error as Error).message}</p>
          <div className='flex justify-center'>
            <Button
              className=' text-white font-semibold py-2 px-4 rounded'
              variant={'destructive'}
            >
              <Link href={`/orders/${orderId}/details`}>Volver a Pagar</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const result = await getOrderById(orderId);

  if (!result.ok) {
    return <p>{result.message}</p>;
  }

  const order = result.order!;

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <HandleClearCart />

      <Card className=' rounded shadow p-8 max-w-lg w-full'>
        <CardTitle className='flex justify-center'>
          <CircleCheckBig color='#72e236' size={30} className='mr-2' />
          <h1 className='text-2xl font-bold text-center mb-4'>
            ¡Gracias por tu compra!
          </h1>
        </CardTitle>

        <h2 className='text-xl font-semibold text-center mb-6'>Resumen</h2>

        <p className='text-center mb-2'>
          <span className='font-semibold'>Número de orden:</span> {order.id}
        </p>
        <p className='text-center mb-2'>
          <span className='font-semibold'>Total de la compra:</span>{' '}
          {currencyFormat(order.total)}
        </p>

        {order.OrderAddress && (
          <p className='text-center mb-6'>
            <span className='font-semibold'>Dirección de envío:</span>{' '}
            {order.OrderAddress.address}{' '}
            {order.OrderAddress.address2 && order.OrderAddress.address2}
          </p>
        )}

        <div className='flex justify-center mb-6'>
          <Button className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded'>
            <Link href='/'>Volver a la tienda</Link>
          </Button>
        </div>

        <p className='text-center text-gray-600 text-sm'>
          Te enviaremos un mensaje a tu correo con el detalle de tu compra
        </p>
      </Card>
    </div>
  );
}
