'use server';
import { registerUser } from '@/actions/auth/register';

export async function handleRegister(formData: FormData) {
  try {
    const user = await registerUser(
      formData.get('email') as string,
      formData.get('password') as string,
      formData.get('name') as string
    );
    return { success: true, user };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
