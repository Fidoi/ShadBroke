'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    });
    console.log(res);
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Iniciar sesión</h1>
      <form onSubmit={handleCredentialsLogin} className='space-y-4'>
        <div>
          <label>Correo:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Entrar</button>
      </form>
      <div className='mt-4'>
        <button onClick={handleGoogleLogin}>Entrar con Google</button>
      </div>
    </div>
  );
}
