/* eslint-disable import/named */
import {
  autoSignIn,
  confirmResetPassword,
  confirmSignUp,
  confirmUserAttribute,
  resendSignUpCode,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
  updateUserAttribute,
  type UpdateUserAttributeOutput,
} from 'aws-amplify/auth';
import { redirect } from 'next/navigation';

import { getErrorMessage } from '@/app/utils/get-error-message';

export async function handleSignUp(
  previousState: string | undefined,
  formData: FormData,
) {
  try {
    await signUp({
      username: String(formData.get('username')),
      password: String(formData.get('password')),
      options: {
        userAttributes: {
          email: String(formData.get('email')),
          name: String(formData.get('name')),
        },
        // optional
        autoSignIn: true,
      },
    });
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect(`/auth/confirm-signup?username=${formData.get('username')}`);
}

export async function handleSendEmailVerificationCode(
  previousState: { message: string; errorMessage: string },
  formData: FormData,
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get('username')),
    });
    currentState = {
      ...previousState,
      message: 'Code sent successfully',
    };
  } catch (error) {
    currentState = {
      ...previousState,
      errorMessage: getErrorMessage(error),
    };
  }

  return currentState;
}

export async function handleConfirmSignUp(
  previousState: string | undefined,
  formData: FormData,
) {
  try {
    await confirmSignUp({
      username: String(formData.get('username')),
      confirmationCode: String(formData.get('code')),
    });
    await autoSignIn();
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect('/auth/signin');
}

export async function handleSignIn(
  previousState: string | undefined,
  formData: FormData,
) {
  let redirectLink = '/';
  try {
    const { nextStep } = await signIn({
      username: String(formData.get('username')),
      password: String(formData.get('password')),
    });
    if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      await resendSignUpCode({
        username: String(formData.get('email')),
      });
      redirectLink = '/auth/confirm-signup';
    }
  } catch (error) {
    return getErrorMessage(error);
  }

  redirect(redirectLink);
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  redirect('/auth/signin');
}

export async function handleUpdateUserAttribute(
  previousState: string,
  formData: FormData,
) {
  let attributeKey = 'name';
  let attributeValue;
  let currentAttributeValue;

  if (formData.get('email')) {
    attributeKey = 'email';
    attributeValue = formData.get('email');
    currentAttributeValue = formData.get('current_email');
  } else {
    attributeValue = formData.get('name');
    currentAttributeValue = formData.get('current_name');
  }

  if (attributeValue === currentAttributeValue) {
    return '';
  }

  try {
    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey: String(attributeKey),
        value: String(attributeValue),
      },
    });
    return handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case 'CONFIRM_ATTRIBUTE_WITH_CODE': {
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      return `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`;
    }
    case 'DONE': {
      return 'success';
    }
  }
}

export async function handleUpdatePassword(
  previousState: 'success' | 'error' | undefined,
  formData: FormData,
) {
  const currentPassword = formData.get('current_password');
  const newPassword = formData.get('new_password');

  if (currentPassword === newPassword) {
    return;
  }

  try {
    await updatePassword({
      oldPassword: String(currentPassword),
      newPassword: String(newPassword),
    });
  } catch (error) {
    console.log(error);
    return 'error';
  }

  return 'success';
}

export async function handleConfirmUserAttribute(
  previousState: 'success' | 'error' | undefined,
  formData: FormData,
) {
  const code = formData.get('code');

  if (!code) {
    return;
  }

  try {
    await confirmUserAttribute({
      userAttributeKey: 'email',
      confirmationCode: String(code),
    });
  } catch (error) {
    console.log(error);
    return 'error';
  }

  return 'success';
}

export async function handleResetPassword(
  previousState: string | undefined,
  formData: FormData,
) {
  try {
    await resetPassword({ username: String(formData.get('email')) });
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect('/auth/reset-password/confirm?email=' + formData.get('email'));
}

export async function handleConfirmResetPassword(
  previousState: string | undefined,
  formData: FormData,
) {
  try {
    await confirmResetPassword({
      username: String(formData.get('email')),
      confirmationCode: String(formData.get('code')),
      newPassword: String(formData.get('password')),
    });
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect('/auth/signin');
}
