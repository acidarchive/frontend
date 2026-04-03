'use server';

import '@/lib/amplify/server';

import { confirmSignUp } from 'aws-amplify/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  ConfirmSignupFormSchema,
  ConfirmSignupFormState,
} from '@/lib/definitions';
import { getErrorMessage } from '@/lib/errors';
import { toAppError } from '@/lib/errors/cognito';

export async function confirmSignUpAction(
  _: unknown,
  formData: FormData,
): Promise<ConfirmSignupFormState> {
  const username = formData.get('username') as string;
  const code = formData.get('code') as string;
  const data = { username, code };

  const validation = ConfirmSignupFormSchema.safeParse(data);

  if (!validation.success) {
    return {
      ...z.flattenError(validation.error),
      data,
    };
  }

  try {
    const response = await confirmSignUp({
      username,
      confirmationCode: code,
    });

    if (response.nextStep.signUpStep === 'DONE') {
      redirect(
        `/auth/signin?confirmed=true&username=${encodeURIComponent(username)}`,
      );
    }
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
  return {
    message: 'Sign up confirmed successfully',
    data,
  };
}
