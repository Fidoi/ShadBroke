import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { User } from '@/interfaces';
import { Tooltip } from '@radix-ui/react-tooltip';

import { UserRoleSelect } from './RoleSelect';
import { Role } from '@prisma/client';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-16 max-w-16 overflow-hidden text-ellipsis whitespace-nowrap'>
            ID
          </TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Pedidos</TableHead>
          <TableHead>Avatar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className='w-16 max-w-16 overflow-hidden whitespace-nowrap'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>{user.id}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className='font-medium'>
              <UserRoleSelect
                userId={user.id}
                initialRole={user.role as Role}
              />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell className='text-right'>{user.email}</TableCell>
            <TableCell className='text-right'>{user.email}</TableCell>
            <TableCell className='text-right'>
              <Avatar className='relative ml-3'>
                <AvatarFallback>
                  <Avatar>
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || 'User'}
                        height={200}
                        width={200}
                        className='cursor-pointer'
                      />
                    ) : (
                      <AvatarFallback className='bg-gray-500 text-white cursor-pointer'>
                        {user?.name?.[0]?.toUpperCase() ?? 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </AvatarFallback>
              </Avatar>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
