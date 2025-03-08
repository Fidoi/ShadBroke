'use client';

import { Heart, LogOut, ShoppingBasket, User } from 'lucide-react';
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
import { Session } from 'next-auth';
import { logout } from '@/actions';
import { useRouter } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';

interface ProfileIconClientProps {
  session: Session;
}

export default function ProfileIconClient({ session }: ProfileIconClientProps) {
  const router = useRouter();

  return (
    <div className='flex gap-4 justify-end items-center'>
      <Link href={'/favorites'}>
        <Heart />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='relative'>
            <ProfileAvatar session={session} className='h-10 w-10' />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>
            {session.user?.name ?? 'Usuario'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href='/profile'
                className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer'
              >
                <User className='w-5 h-5 mr-2' />
                Perfil
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
    </div>
  );
}
