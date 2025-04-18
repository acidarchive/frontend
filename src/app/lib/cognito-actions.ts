/* eslint-disable import/named */
import {
  autoSignIn,
  confirmResetPassword,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import { redirect } from 'next/navigation';

import { getErrorMessage } from '@/app/utils/get-error-message';

export async function handleSignUp(data: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    await signUp({
      username: data.username,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
          name: data.username,
        },
        autoSignIn: true,
      },
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
  redirect(`/auth/confirm-signup?username=${data.username}`);
}

export async function handleSendEmailVerificationCode(username: string) {
  try {
    await resendSignUpCode({
      username: username,
    });
    return {
      success: 'Code sent successfully',
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function handleConfirmSignUp(data: {
  username: string;
  code: string;
}) {
  try {
    await confirmSignUp({
      username: data.username,
      confirmationCode: data.code,
    });
    await autoSignIn();
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
  redirect('/auth/signin');
}

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
      redirect(`/auth/confirm-signup?username=${data.username}`);
    }
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function handleResetPassword(data: { email: string }) {
  try {
    await resetPassword({ username: data.email });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
  redirect(`/auth/reset-password/confirm?email=${data.email}`);
}

export async function handleConfirmResetPassword(data: {
  email: string;
  password: string;
  code: string;
}) {
  try {
    await confirmResetPassword({
      username: data.email,
      confirmationCode: data.code,
      newPassword: data.password,
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
  redirect('/auth/signin');
}
