'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/atoms/button';
import { ErrorMessage } from '@/components/atoms/error-message';
import { InputElement } from '@/components/molecules/input-element';
import { useUser } from '@/context/user-context';
import { handleSignIn } from '@/lib/cognito-actions';
import {
  signin_password_validation,
  signin_username_validation,
} from '@/utils/input-validations';

type SigninFormValues = {
  username: string;
  password: string;
};
export function SigninForm() {
  const router = useRouter();
  const methods = useForm<SigninFormValues>();
  const [error, setError] = useState<string>('');

  const { refreshUser } = useUser();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    setError('');
    const result = await handleSignIn(data);

    if (result?.error) {
      setError(result.error);
    } else {
      await refreshUser();
      router.push('/dashboard/tb303');
    }
  });

  return (
    <>
      <ErrorMessage message={error} />
      <FormProvider {...methods}>
        <form
          onSubmit={event => event.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <InputElement {...signin_username_validation} />
          <InputElement
            {...signin_password_validation}
            labelAction={
              <Link
                href="/auth/reset-password/submit"
                className="font-semibold text-gray-900 hover:text-gray-500"
              >
                Forgot password?
              </Link>
            }
          />
          <div className="mt-6">
            <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
