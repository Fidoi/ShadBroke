import { RegisterForm } from '@/components';
import { Card } from '@/components/ui/card';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ShadCash - Registro',
  description: 'Registrarse en ShadCash',
};

export default function RegisterPage() {
  return (
    <div className='relative min-h-screen'>
      <Image
        src='https://res.cloudinary.com/dzftv7yux/image/upload/v1733883656/samples/coffee.jpg'
        alt='Fondo de registro'
        fill
        className='object-cover absolute inset-0 -z-10 dark:brightness-[0.2] dark:grayscale'
      />

      <div className='flex flex-col items-center justify-center min-h-screen p-6 md:p-10'>
        <Card className='p-8 rounded-lg shadow-lg w-full max-w-md'>
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}
