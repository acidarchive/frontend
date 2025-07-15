'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/components/atoms/error-message';
import { SuccessMessage } from '@/components/atoms/success-message';
import { InputElement } from '@/components/molecules/input-element';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/user-context';
import {
  handleConfirmSignUp,
  handleSendEmailVerificationCode,
} from '@/lib/cognito-actions';
import {
  username_validation,
  verification_code_validation,
} from '@/utils/input-validations';

interface ConfirmSignupFormProps {
  username: string;
}

type ConfirmSignupFormValues = {
  username: string;
  code: string;
};

export function ConfirmSignupForm({ username }: ConfirmSignupFormProps) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const methods = useForm<ConfirmSignupFormValues>({
    defaultValues: {
      username,
    },
  });

  const { refreshUser } = useUser();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    setError('');
    setSuccess('');
    const result = await handleConfirmSignUp(data);

    if (result?.error) {
      setError(result.error);
    } else {
      await refreshUser();
      router.push('/');
    }
  });

  const onResendCode = async () => {
    setError('');
    setSuccess('');
    const result = await handleSendEmailVerificationCode(username);
    if (result?.error) {
      setError(result.error);
    }
    if (result?.success) {
      setSuccess(result.success);
    }
  };

  return (
    <>
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />
      <FormProvider {...methods}>
        <form
          onSubmit={event => event.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <InputElement {...username_validation} disabled={true} />
          <InputElement
            {...verification_code_validation}
            labelAction={
              <button
                className="font-semibold hover:underline"
                onClick={onResendCode}
              >
                Resend Verification Code
              </button>
            }
          />

          <div className="mt-6">
            <Button
              className="w-full"
              type="submit"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Confirming...' : 'Confirm'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
