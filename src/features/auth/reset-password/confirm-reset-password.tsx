'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

import { confirmPasswordResetAction } from '@/actions';
import { ConfirmPasswordResetForm } from '@/components/organisms/auth/confirm-password-reset-form';

export function ConfirmResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [state, formAction, isPending] = useActionState(
    confirmPasswordResetAction,
    {
      data: { email, code: '', password: '', confirmPassword: '' },
    },
  );

  return (
    <ConfirmPasswordResetForm
      action={formAction}
      formError={state?.formErrors?.at(0)}
      fieldErrors={state?.fieldErrors}
      defaultValues={state?.data}
      isPending={isPending}
    />
  );
}
