'use server';

import '@/lib/amplify/server';

import { signUp } from 'aws-amplify/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { SignupFormSchema, SignupFormState } from '@/lib/definitions';
import { getErrorMessage } from '@/lib/errors';
import { toAppError } from '@/lib/errors/cognito';

export async function signupAction(
  _: unknown,
  formData: FormData,
): Promise<SignupFormState> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const data = { username, email, password, confirmPassword };

  const validation = SignupFormSchema.safeParse(data);

  if (!validation.success) {
    return {
      ...z.flattenError(validation.error),
      data,
    };
  }

  try {
    const response = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          name: username,
        },
      },
    });

    if (response.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
      redirect(`/auth/confirm-signup?username=${encodeURIComponent(username)}`);
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
    data,
  };
}
