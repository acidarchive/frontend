'use client';

import { useActionState } from 'react';

import { resetPasswordAction } from '@/actions';
import { SubmitPasswordResetForm } from '@/components/organisms/auth/submit-password-reset-form';

export function SubmitResetPassword() {
  const [resetPasswordState, resetAction, isPending] = useActionState(
    resetPasswordAction,
    { data: { email: '' } },
  );

  return (
    <SubmitPasswordResetForm
      resetAction={resetAction}
      isPending={isPending}
      fieldErrors={resetPasswordState?.fieldErrors}
      formError={resetPasswordState?.formErrors?.at(0)}
      defaultValues={resetPasswordState?.data}
    />
  );
}
