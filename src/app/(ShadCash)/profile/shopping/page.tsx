import { getOrderByUser } from '@/actions';
import { PedidosTable } from '@/components';

import { format } from 'date-fns';
import { ScrollText } from 'lucide-react';

export default async function PedidosPage() {
  const { ok, orders, message } = await getOrderByUser();

  if (!ok) {
    return <p className='p-4 text-red-500'>{message}</p>;
  }
  if (!orders) return;
  const data = orders.map((order) => ({
    id: order.id,
    status: order.isPaid,
    address: order.OrderAddress
      ? `${order.OrderAddress.firstName} ${order.OrderAddress.lastName}`
      : 'Sin dirección',
    price: order.total ?? 0,
    createdAt: format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm'),
  }));

  return (
    <div className='container py-8'>
      <div className='flex gap-x-3'>
        <ScrollText />
        <h1 className='text-2xl font-bold mb-4'> Mis Pedidos</h1>
      </div>
      <PedidosTable data={data} />
    </div>
  );
}
