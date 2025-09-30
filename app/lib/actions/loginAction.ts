'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

/*--------------------------------SIGN-IN--------------------------------------------------*/
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales erroneas.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}