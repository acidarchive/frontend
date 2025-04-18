'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/app/components/atoms/button';
import { FormLabel } from '@/app/components/atoms/form-label/form-label';
import { Input } from '@/app/components/atoms/input';
import { handleSignIn } from '@/app/lib/cognito-actions';

export function SigninForm() {
  const [errorMessage, dispatch] = useActionState(handleSignIn, '');

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <FormLabel htmlFor="username">Username</FormLabel>
        <div className="mt-2">
          <Input id="username" name="username" type="username" required />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="password">Password</FormLabel>
          <div className="text-sm">
            <Link
              href="/auth/reset-password/submit"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <Input id="password" name="password" type="password" required />
        </div>
      </div>

      <div>
        <SigninButton />
        <div className="flex flex-col mt-4 h-10">
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );

  function SigninButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" aria-disabled={pending}>
        Sign in
      </Button>
    );
  }
}
