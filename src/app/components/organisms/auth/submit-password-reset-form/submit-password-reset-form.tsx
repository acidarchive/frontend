'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/app/components/atoms/button';
import { FormLabel } from '@/app/components/atoms/form-label/form-label';
import { Input } from '@/app/components/atoms/input';
import { handleResetPassword } from '@/app/lib/cognito-actions';

export function SubmitPasswordResetForm() {
  const [errorMessage, dispatch] = useActionState(handleResetPassword, '');

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <div className="mt-2">
          <Input id="email" name="email" type="email" required />
        </div>
      </div>

      <div>
        <SendConfirmationCodeButton />
        <div className="flex flex-col mt-4 h-10">
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}

function SendConfirmationCodeButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Send code
    </Button>
  );
}
