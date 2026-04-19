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
import { ErrorCode, getErrorMessage } from '@/lib/errors';
import { toAppError } from '@/lib/errors/cognito';

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
    const appError = toAppError(error);
    if (appError.code === ErrorCode.COGNITO_ALREADY_AUTHENTICATED) {
      await signOut();
      return handleSignIn(data);
    }
    return { error: getErrorMessage(appError) };
  }
}

export async function handleSignOut() {
  try {
    await signOut();
    return { success: true };
  } catch (error) {
    const appError = toAppError(error, 'Failed to sign out');
    return { error: getErrorMessage(appError) };
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
    const appError = toAppError(error);
    return {
      formErrors: [getErrorMessage(appError)],
      data,
    };
  }
}
