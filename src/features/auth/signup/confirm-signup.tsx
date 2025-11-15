'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

import { confirmSignUpAction, resendSignupCodeAction } from '@/actions';
import { ConfirmSignupForm } from '@/components/organisms/auth/confirm-signup-form';

export function ConfirmSignup() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || '';

  const [confirmState, confirmAction, isConfirmPending] = useActionState(
    confirmSignUpAction,
    {
      data: { username, code: '' },
    },
  );

  const [resendState, resendAction, isResendPending] = useActionState(
    resendSignupCodeAction,
    { data: { username, code: '' }, message: '' },
  );

  return (
    <ConfirmSignupForm
      confirmSignUpAction={confirmAction}
      resendSignupCodeAction={resendAction}
      isPending={isConfirmPending}
      isResendPending={isResendPending}
      formError={
        confirmState?.formErrors?.at(0) || resendState?.formErrors?.at(0)
      }
      message={resendState?.message}
      fieldErrors={confirmState?.fieldErrors}
      defaultValues={confirmState?.data || resendState?.data}
    />
  );
}
