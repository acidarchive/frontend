'use server';

import '@/lib/amplify/server';

import { resetPassword } from 'aws-amplify/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  PasswordResetFormSchema,
  PasswordResetFormState,
} from '@/lib/definitions';

export async function resetPasswordAction(
  _: unknown,
  formData: FormData,
): Promise<PasswordResetFormState> {
  const email = formData.get('email') as string;
  const data = { email };

  const validation = PasswordResetFormSchema.safeParse(data);

  if (!validation.success) {
    return {
      ...z.flattenError(validation.error),
      data,
    };
  }

  try {
    await resetPassword({
      username: email,
    });

    redirect(`/auth/reset-password/confirm?email=${encodeURIComponent(email)}`);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error) {
      if (error.name === 'UserNotFoundException') {
        return {
          formErrors: ['No account found with this email address.'],
          data,
        };
      }
      if (error.name === 'LimitExceededException') {
        return {
          formErrors: ['Too many attempts. Please try again later.'],
          data,
        };
      }
    }
  }

  return {
    formErrors: ['Something went wrong. Please try again.'],
    data,
  };
}
