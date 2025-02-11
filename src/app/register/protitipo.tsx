import { registerUser } from '@/actions/auth/register';

export default function RegisterPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    try {
      await registerUser(
        formData.get('email') as string,
        formData.get('password') as string,
        formData.get('name') as string
      );
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form
        action={handleSubmit}
        className='w-full max-w-md bg-white rounded-lg shadow-md p-6'
      >
        <h2 className='text-2xl font-bold text-center mb-6'>Regístrate</h2>

        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-gray-700 font-medium mb-1'
          >
            Nombre
          </label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Juan Pérez'
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 font-medium mb-1'
          >
            Correo electrónico
          </label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='juan@ejemplo.com'
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
          Registrarse
        </button>
      </form>
    </div>
  );
}
