'use client';

import { ColumnDef } from '@tanstack/react-table';
import { currencyFormat } from '@/utils';
import Link from 'next/link';
import { ArrowUpDown, Pencil } from 'lucide-react';
import { Button } from '@/components';
import DataTable from '../SquemeTable';
import { Product, Type } from '@/interfaces';
import { Gender } from '@prisma/client';
import Image from 'next/image';

interface ProductWithImages extends Product {
  images: string[];
}
const genderLabels: Record<Gender, string> = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
  unisex: 'unisex',
};
const typesLabels: Record<Type, string> = {
  pant: 'Pantalones',
  shirt: 'Camisas',
  hat: 'Gorras',
  hoodie: 'Sudaderas',
  sweatshirt: 'Polerones',
};
const columns: ColumnDef<ProductWithImages>[] = [
  {
    accessorKey: 'images',
    header: 'Imagen',
    cell: ({ row }) => (
      <Link
        className='hover:underline cursor-pointer'
        href={`/product/${row.original.slug}`}
      >
        <Image
          src={row.original.images?.[0] || '/imgs/placeholder.jpg'}
          alt={row.original.title || 'Imagen de producto'}
          height={50}
          width={50}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/imgs/placeholder.jpg';
          }}
        />
      </Link>
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Título
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
        Precio
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => currencyFormat(row.getValue('price')),
  },
  {
    accessorKey: 'gender',
    header: 'Género',
    cell: ({ row }) => genderLabels[row.getValue('gender') as Gender],
  },
  {
    accessorKey: 'tags',
    header: 'Tipo',
    cell: ({ row }) => typesLabels[row.getValue('tags') as Type],
  },
  {
    accessorKey: 'inStock',
    header: 'Stock',
    cell: ({ row }) => row.original.inStock,
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <Link href={`/profile/admin/products/${row.original.slug}`}>
          <Button variant='outline'>
            <Pencil />
            Editar
          </Button>
        </Link>
      </div>
    ),
  },
];

export const ProductsTable = ({
  products,
}: {
  products: ProductWithImages[];
}) => {
  return (
    <DataTable
      data={products}
      columns={columns}
      filterKey='title'
      filterPlaceholder='Buscar productos...'
      pageSize={6}
      rowId='id'
    />
  );
};
