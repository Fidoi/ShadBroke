'use client';

import { ColumnDef } from '@tanstack/react-table';
import { User } from '@prisma/client';
import { UserRoleSelect } from '@/components/admin/users/RoleSelect';
import SquemeTable from '../SquemeTable';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components';
import Image from 'next/image';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'image',
    header: 'Avatar',
    cell: ({ row }) => (
      <Avatar>
        {row.original.image ? (
          <Image
            src={row.original.image}
            alt={row.original.name || 'User'}
            fill
            className='rounded-full object-cover'
          />
        ) : (
          <AvatarFallback className='bg-gray-500 text-white'>
            {row.original.name?.[0]?.toUpperCase() ?? 'U'}
          </AvatarFallback>
        )}
      </Avatar>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nombre
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Rol
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <UserRoleSelect
        userId={row.original.id}
        initialRole={row.original.role}
      />
    ),
    sortingFn: 'basic',
  },
];

export const UsersTable = ({ users }: { users: User[] }) => {
  return (
    <SquemeTable
      data={users}
      columns={columns}
      filterKey='name'
      filterPlaceholder='Buscar usuarios...'
      pageSize={10}
      rowId='id'
    />
  );
};
