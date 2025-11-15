'use server';

import '@/lib/amplify/server';

import { resendSignUpCode } from 'aws-amplify/auth';

import { ConfirmSignupFormState } from '@/lib/definitions';

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
  } catch {
    return {
      formErrors: ['Failed to resend code. Please try again.'],
      data: { username, code: '' },
    };
  }
}
