'use client';
import Checkout from '@/components/checkout';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      {session ? (
        <div className='flex items-center gap-2'>
          {session?.user?.image && (
            <Image
              src={session.user.image}
              height={50}
              width={50}
              alt='Avatar'
              className='w-8 h-8 rounded-full'
            />
          )}
          <span>{session?.user?.name}</span>
          <button
            onClick={() => signOut()}
            className='ml-4 px-3 py-1 bg-red-600 rounded'
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <a href='/login' className='px-3 py-1 bg-blue-600 rounded'>
          Iniciar sesión
        </a>
      )}
      <Checkout />
    </>
  );
}
