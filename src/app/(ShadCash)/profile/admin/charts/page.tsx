import { Overview } from './ui/OverView';
import { RecentSales } from './ui/RecentSales';

import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { getAllPaidOrders } from '@/actions';
import { currencyFormat } from '@/utils';
import { CreditCard, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { Order } from '@/interfaces';

export default async function Dashboard() {
  const response = await getAllPaidOrders();

  if (!response.ok) {
    return <div>{response.message}</div>;
  }

  const orders: Order[] = (response.orders ?? []).map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
    user: {
      name: order.user?.name || 'Cliente anónimo',
      email: order.user?.email || 'sin-email@example.com',
      image: order.user?.image || null,
    },
  }));

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalSales = orders.length;
  const recentOrders = orders.slice(0, 5);
  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Ventas</h2>
      </div>

      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-x-3'>
            <TrendingUp />
            Vista general
          </CardTitle>
        </CardHeader>
        <CardContent className='pl-2'>
          <Overview orders={orders} />
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div className='space-y-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total recaudado
              </CardTitle>
              <DollarSign className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {currencyFormat(totalRevenue)}
              </div>
              <p className='text-xs text-muted-foreground'>
                Total en órdenes pagadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total de ventas
              </CardTitle>
              <CreditCard className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalSales}</div>
              <p className='text-xs text-muted-foreground'>
                Órdenes procesadas
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle className='flex justify-between text-2xl font-bold gap-x-2'>
              <span>Compras Recientes</span>
              <ShoppingBag />
            </CardTitle>
            <p className='text-xs text-muted-foreground'>
              Últimas 5 transacciones completadas
            </p>
          </CardHeader>
          <CardContent>
            <RecentSales orders={recentOrders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
