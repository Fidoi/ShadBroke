import { LoginForm } from '@/components';
import Icon from '@/components/icons/icon';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ShadCash - Ingresar',
  description: 'Ingresar en ShadCash',
};

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link href='/' className='flex items-center gap-2 font-medium'>
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <Icon className='size-4' />
            </div>
            ShadCash.
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block bg-gray-500'>
        <Image
          src='https://res.cloudinary.com/dzftv7yux/image/upload/v1733883648/samples/landscapes/architecture-signs.jpg'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
          fill
        />
      </div>
    </div>
  );
}
