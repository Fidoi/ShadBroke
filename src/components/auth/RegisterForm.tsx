'use client';
import { AlertCircle, GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleRegister } from '@/actions/auth/handler';
import { signIn } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const result = await handleRegister(formData);

    if (result?.error) {
      setError(`Error al registrar: ${result.error}`);
      return;
    }

    const signInResult = await signIn('credentials', {
      email: formData.get('email') as string,
      password: password,
      redirect: false,
    });

    if (!signInResult?.error) {
      router.push('/');
    } else {
      setError(`Error al iniciar sesión: ${signInResult.error}`);
    }
  }
  return (
    <div className={cn('flex flex-col gap-6 ', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <Link
              href='#'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex h-8 w-8 items-center justify-center rounded-md'>
                <GalleryVerticalEnd className='size-6' />
              </div>
              <span className='sr-only'>Acme Inc.</span>
            </Link>
            <h1 className='text-xl font-bold'>Bienvenido al Acme Inc.</h1>
            <div className='text-center text-sm'>
              ¿Ya tienes una cuenta?{' '}
              <Link href='/login' className='underline underline-offset-4'>
                Iniciar sesión
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input type='text' name='name' id='name' required />

              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='m@example.com'
                required
              />

              <Label htmlFor='password'>Contraseña</Label>
              <Input
                id='password'
                type='password'
                name='password'
                placeholder='*******'
                required
              />

              <Label htmlFor='confirmPassword'>Confirmar Contraseña</Label>
              <Input
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                placeholder='*******'
                required
              />
            </div>
            {error ? (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <></>
            )}
            <Button type='submit' className='w-full'>
              Registrarse
            </Button>
          </div>

          <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
            <span className='relative z-10 bg-background px-2 text-muted-foreground'>
              O
            </span>
          </div>

          <div>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => signIn('google')}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path
                  d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  fill='currentColor'
                />
              </svg>
              Continuar con Google
            </Button>
          </div>
        </div>
      </form>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  '>
        Al continuar, aceptas nuestros <a href='#'>Términos de Servicio</a> y{' '}
        <a href='#'>Política de Privacidad</a>.
      </div>
    </div>
  );
}
