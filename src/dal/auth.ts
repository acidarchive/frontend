'use client';

import {
  resendSignUpCode,
  signIn,
  signOut,
  updatePassword,
} from 'aws-amplify/auth';
import { z } from 'zod';

import {
  ChangePasswordFormState,
  ChangePasswordSchema,
} from '@/lib/definitions';

export async function handleSignIn(data: {
  username: string;
  password: string;
}) {
  try {
    const { nextStep } = await signIn({
      username: data.username,
      password: data.password,
    });
    if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      await resendSignUpCode({
        username: String(data.username),
      });
      return {
        redirect: `/auth/confirm-signup?username=${encodeURIComponent(data.username)}`,
      };
    }
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotAuthorizedException') {
        return { error: 'Incorrect username or password.' };
      }
      if (error.name === 'UserNotFoundException') {
        return { error: 'Incorrect username or password.' };
      }
      if (error.name === 'UserAlreadyAuthenticatedException') {
        return { success: true };
      }
    }
    return { error: 'Something went wrong. Please try again.' };
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.error('Sign out failed', error);
  }
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}): Promise<ChangePasswordFormState> {
  const validation = ChangePasswordSchema.safeParse(data);

  if (!validation.success) {
    return {
      ...z.flattenError(validation.error),
      data,
    };
  }

  try {
    await updatePassword({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotAuthorizedException') {
        return {
          formErrors: ['Current password is incorrect.'],
          data,
        };
      }
      if (error.name === 'LimitExceededException') {
        return {
          formErrors: ['Too many attempts. Please try again later.'],
          data,
        };
      }
      if (error.name === 'InvalidPasswordException') {
        return {
          formErrors: [
            'New password does not meet requirements. Please try a different password.',
          ],
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
