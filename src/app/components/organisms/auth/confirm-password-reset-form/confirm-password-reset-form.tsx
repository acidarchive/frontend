'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/app/components/atoms/button';
import { FormLabel } from '@/app/components/atoms/form-label/form-label';
import { Input } from '@/app/components/atoms/input';
import { handleConfirmResetPassword } from '@/app/lib/cognito-actions';

export interface ConfirmPasswordResetFormProps {
  email: string;
}

export function ConfirmPasswordResetForm({
  email,
}: ConfirmPasswordResetFormProps) {
  const [errorMessage, dispatch] = useActionState(
    handleConfirmResetPassword,
    '',
  );

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <div className="mt-2">
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={email}
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="password">New Password</FormLabel>
        </div>
        <div className="mt-2">
          <Input id="password" name="password" type="password" required />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="code">Confirmation Code</FormLabel>
        </div>
        <div className="mt-2">
          <input
            id="code"
            name="code"
            type="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <ResetPasswordButton />
        <div className="flex flex-col mt-4 h-10">
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}

function ResetPasswordButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Reset password
    </Button>
  );
}
