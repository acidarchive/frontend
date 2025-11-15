'use server';

import '@/lib/amplify/server';

import { confirmResetPassword } from 'aws-amplify/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  ConfirmPasswordResetFormSchema,
  ConfirmPasswordResetFormState,
} from '@/lib/definitions';

export async function confirmPasswordResetAction(
  _: unknown,
  formData: FormData,
): Promise<ConfirmPasswordResetFormState> {
  const email = formData.get('email') as string;
  const code = formData.get('code') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const data = { email, code, password, confirmPassword };

  const validation = ConfirmPasswordResetFormSchema.safeParse(data);

  if (!validation.success) {
    return {
      ...z.flattenError(validation.error),
      data,
    };
  }

  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword: password,
    });

    redirect('/auth/signin');
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error) {
      if (error.name === 'CodeMismatchException') {
        return {
          formErrors: ['Invalid verification code. Please try again.'],
          data,
        };
      }
      if (error.name === 'ExpiredCodeException') {
        return {
          formErrors: [
            'Verification code has expired. Please request a new one.',
          ],
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
