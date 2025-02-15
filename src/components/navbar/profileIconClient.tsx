'use client';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { LogOut, ShoppingBasket, User, Star, Crown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';
import { logout } from '@/actions';
import { useRouter } from 'next/navigation';

interface ProfileIconClientProps {
  session: Session;
}

export default function ProfileIconClient({ session }: ProfileIconClientProps) {
  const router = useRouter();
  const isAdmin = session.user?.role === 'admin';
  console.log(isAdmin);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='relative ml-3'>
          <Avatar>
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                height={200}
                width={200}
                className='cursor-pointer'
              />
            ) : (
              <AvatarFallback className='bg-gray-500 text-white cursor-pointer'>
                {session.user?.name?.[0]?.toUpperCase() ?? 'U'}
              </AvatarFallback>
            )}
          </Avatar>
          {isAdmin && (
            <Star
              className='absolute -top-1 -right-1 w-6 h-6 text-yellow-500 z-20'
              fill='currentColor'
              stroke='none'
            />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name ?? 'Usuario'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href='/profile'
              className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer'
            >
              {isAdmin ? (
                <>
                  <Crown className='w-5 h-5 mr-2' />
                  Perfil
                </>
              ) : (
                <>
                  <User className='w-5 h-5 mr-2' />
                  Perfil
                </>
              )}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer'
            >
              <ShoppingBasket />
              Compras
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              await logout();
              router.refresh();
            }}
            className='flex flex-row px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer '
          >
            <LogOut />
            Salir
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
