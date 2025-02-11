'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Credenciales inválidas. Intenta nuevamente.');
    } else {
      router.push('/');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white rounded-lg shadow-md p-6'
      >
        <h2 className='text-2xl font-bold text-center mb-6'>Iniciar Sesión</h2>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 font-medium mb-1'
          >
            Usuario o correo
          </label>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='jsmith'
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-gray-700 font-medium mb-1'
          >
            Contraseña
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='********'
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors'
        >
          Ingresar
        </button>
      </form>
      <button
        onClick={() => signIn('google')}
        className='bg-sky-400 px-3 py-2 rounded'
      >
        Google
      </button>
    </div>
  );
}
