'use client';

import { useActionState } from 'react';

import { signupAction } from '@/actions';
import { SignupForm } from '@/components/organisms/auth/signup-form';

export function SignupPage() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    undefined,
  );

  return (
    <SignupForm
      action={formAction}
      formError={state?.formErrors?.at(0)}
      fieldErrors={state?.fieldErrors}
      defaultValues={state?.data}
      isPending={isPending}
    />
  );
}
