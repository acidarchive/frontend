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
import { getErrorMessage } from '@/lib/errors';
import { toAppError } from '@/lib/errors/cognito';

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
    const appError = toAppError(error);
    return {
      formErrors: [getErrorMessage(appError)],
      data,
    };
  }
}
