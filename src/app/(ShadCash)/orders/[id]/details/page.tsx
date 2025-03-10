import { getOrderById } from '@/actions';
import { ClientPaymentButton, OrderStatus } from '@/components';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { currencyFormat } from '@/utils';
import Link from 'next/link';

interface OrdersDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrdersDetails({ params }: OrdersDetailsProps) {
  const { id } = await params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }
  const address = order?.OrderAddress;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <OrderStatus isPaid={order!.isPaid} />

            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + '-' + item.size}
                className='flex mb-5'
              >
                <Link
                  className='hover:underline cursor-pointer'
                  href={`/product/${item.product.slug}`}
                >
                  <Image
                    src={`${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    alt={item.product.title}
                    className='mr-5 rounded'
                  />
                </Link>
                <div className=''>
                  <p>{item.product.title}</p>
                  <p>
                    {item.price} x {item.quantity}
                  </p>
                  <p className='font-bold'>
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Direccion de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {address!.firstName} {address!.lastName}
              </p>
              <p className='font-bold'>{address!.address}</p>
              <p>
                {`${address!.region.nombre} - `} {address!.provincia.nombre}
                {' - '}
                {address!.comuna.nombre}
              </p>

              <p>Telefono: {address!.phone}</p>
            </div>

            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />
            <h2 className='text-2xl mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>
              <span>No. Productos</span>
              <span className='text-right'>
                {order?.itemsInOrder === 1
                  ? '1 artículo'
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className='text-right'>
                {currencyFormat(order!.subTotal)}
              </span>

              <span className='mt-5 text-2xl'>Total:</span>
              <span className='mt-5 text-2xl text-right'>
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className='mt-5 mb-2 w-full'>
              {order?.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <ClientPaymentButton
                  amount={order!.total}
                  orderId={order!.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
