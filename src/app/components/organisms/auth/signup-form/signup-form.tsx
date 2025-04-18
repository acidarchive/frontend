'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/app/components/atoms/button';
import { FormLabel } from '@/app/components/atoms/form-label/form-label';
import { Input } from '@/app/components/atoms/input';
import { handleSignUp } from '@/app/lib/cognito-actions';

export function SignupForm() {
  const [errorMessage, dispatch] = useActionState(handleSignUp, '');

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <FormLabel htmlFor="username">Username</FormLabel>
        <div className="mt-2">
          <Input id="username" name="username" type="text" required />
        </div>
      </div>
      <div>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <div className="mt-2">
          <Input id="email" name="email" type="email" required />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="password">Password</FormLabel>
        </div>
        <div className="mt-2">
          <Input id="password" name="password" type="password" required />
        </div>
      </div>

      <div>
        <SignUpButton />
        <div className="flex flex-col mt-4 h-10">
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Sign up
    </Button>
  );
}
