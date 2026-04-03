'use server';

import '@/lib/amplify/server';

import { resendSignUpCode } from 'aws-amplify/auth';

import { ConfirmSignupFormState } from '@/lib/definitions';
import { getErrorMessage } from '@/lib/errors';
import { toAppError } from '@/lib/errors/cognito';

export async function resendSignupCodeAction(
  _: unknown,
  formData: FormData,
): Promise<ConfirmSignupFormState> {
  const username = formData.get('username') as string;

  try {
    await resendSignUpCode({
      username,
    });

    return {
      message: 'Verification code sent successfully!',
      data: { username, code: '' },
    };
  } catch (error) {
    const appError = toAppError(error);
    return {
      formErrors: [getErrorMessage(appError)],
      data: { username, code: '' },
    };
  }
}
