'use client';

import { resendSignUpCode, signIn, signOut } from 'aws-amplify/auth';

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
