'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { currencyFormat } from '@/utils';
import Link from 'next/link';
import { ArrowUpDown } from 'lucide-react';
import SquemeTable from '../SquemeTable';
import { OrderStatus } from '@/components';

interface Order {
  id: string;
  status: boolean;
  address: string;
  price: number;
  createdAt: string;
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Estado
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <OrderStatus isPaid={row.getValue('status')} />,
    sortingFn: 'basic',
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Dirección
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Total
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => currencyFormat(row.getValue('price')),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Fecha
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { id, status } = row.original;
      return (
        <Link href={`/orders/${id}/details`}>
          <Button variant={status ? 'outline' : 'default'} size='sm'>
            {status ? 'Ver detalles' : 'Ir a pagar'}
          </Button>
        </Link>
      );
    },
  },
];

export const PedidosTable = ({ data }: { data: Order[] }) => {
  return (
    <SquemeTable
      data={data}
      columns={columns}
      filterKey='address'
      filterPlaceholder='Buscar pedidos por dirección...'
      pageSize={10}
      rowId='id'
    />
  );
};
