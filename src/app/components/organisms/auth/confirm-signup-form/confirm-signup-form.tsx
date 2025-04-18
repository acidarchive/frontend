'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/app/components/atoms/button';
import { FormLabel } from '@/app/components/atoms/form-label/form-label';
import { Input } from '@/app/components/atoms/input';
import {
  handleConfirmSignUp,
  handleSendEmailVerificationCode,
} from '@/app/lib/cognito-actions';

interface ConfirmSignupFormProps {
  username: string;
}

export function ConfirmSignupForm({ username }: ConfirmSignupFormProps) {
  const [errorMessage, dispatch] = useActionState(handleConfirmSignUp, '');
  const [verificationResponse, dispatchVerification] = useActionState(
    handleSendEmailVerificationCode,
    {
      message: '',
      errorMessage: '',
    },
  );

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <FormLabel htmlFor="username">Username</FormLabel>
        <div className="mt-2">
          <Input
            id="username"
            name="username"
            type="text"
            defaultValue={username}
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <FormLabel htmlFor="code">Verification Code</FormLabel>
          <div className="text-sm">
            <button
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              formAction={dispatchVerification}
            >
              Resend Verification Code
            </button>
          </div>
        </div>
        <div className="mt-2">
          <Input id="code" name="code" type="text" />
        </div>
      </div>

      <div>
        <ConfirmButton />
        <div className="flex flex-col mt-4 h-10">
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          {verificationResponse?.errorMessage && (
            <>
              <p className="text-sm text-red-500">
                {verificationResponse.errorMessage}
              </p>
            </>
          )}
          {verificationResponse?.message && (
            <p className="text-sm text-green-500">
              {verificationResponse.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Confirm
    </Button>
  );
}
