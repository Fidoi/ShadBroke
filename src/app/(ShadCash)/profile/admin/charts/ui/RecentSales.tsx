import { Avatar, AvatarFallback } from '@/components';
import { Order } from '@/interfaces';
import { currencyFormat } from '@/utils';
import Image from 'next/image';

interface RecentSalesProps {
  orders: Order[];
}

export function RecentSales({ orders }: RecentSalesProps) {
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className='space-y-8'>
      {sortedOrders.map((order) => {
        return (
          <div className='flex items-center' key={order.id}>
            <Avatar className='h-9 w-9'>
              {order.user.image ? (
                <Image
                  src={order.user.image}
                  alt={order.user.name || 'User'}
                  height={90}
                  width={90}
                  className='rounded-full object-cover'
                />
              ) : (
                <AvatarFallback>
                  {order.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <div className='ml-4 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {order.user.name}
              </p>
              <p className='text-sm text-muted-foreground'>
                {order.user.email}
              </p>
            </div>
            <div className='ml-auto font-medium'>
              {currencyFormat(order.total)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
