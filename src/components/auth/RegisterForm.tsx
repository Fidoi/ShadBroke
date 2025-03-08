'use client';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login, registerUser } from '@/actions';
import Icon from '../icons/icon';
import { useRouter } from 'next/navigation';

type FormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    router.push('/');
  };

  return (
    <div className={cn('flex flex-col gap-6 ')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <Link
              href='/'
              className='flex flex-col items-center gap-2 font-medium'
            >
              <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary'>
                <Icon className='size-4' />
              </div>
              <span className='sr-only'>ShadBroke.</span>
            </Link>
            <h1 className='text-xl font-bold'>Registrate en ShadBroke!</h1>
            <div className='text-center text-sm'>
              ¿O ya tienes una cuenta?{' '}
              <Link href='/auth/login' className='underline underline-offset-4'>
                Iniciar sesión
              </Link>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                type='text'
                {...register('name', {
                  required: 'El nombre es obligatorio',
                })}
              />
              {errors.name && (
                <span className='text-red-500 text-sm'>
                  {errors.name.message}
                </span>
              )}

              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  {errors.email.message}
                </span>
              )}
              <Label htmlFor='password'>Contraseña</Label>
              <Input
                type='password'
                placeholder='******'
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
              />
              {errors.password && (
                <span className='text-red-500 text-sm'>
                  {errors.password.message}
                </span>
              )}

              <Label htmlFor='confirmPassword'>Confirmar Contraseña</Label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='******'
                {...register('confirmPassword', {
                  required: 'La confirmación de la contraseña es obligatoria',
                  validate: (value) =>
                    value === watch('password') ||
                    'Las contraseñas no coinciden',
                })}
              />
              {errors.confirmPassword && (
                <span className='text-red-500 text-sm'>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            {errorMessage ? (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
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
              onClick={(e) => {
                e.preventDefault();
                signIn('google');
              }}
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
