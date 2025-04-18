'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/app/components/atoms/button';
import { ErrorMessage } from '@/app/components/atoms/error-message';
import { SuccessMessage } from '@/app/components/atoms/success-message';
import { InputElement } from '@/app/components/molecules/input-element';
import {
  handleConfirmSignUp,
  handleSendEmailVerificationCode,
} from '@/app/lib/cognito-actions';
import {
  username_validation,
  verification_code_validation,
} from '@/app/utils/input-validations';

interface ConfirmSignupFormProps {
  username: string;
}

type ConfirmSignupFormValues = {
  username: string;
  code: string;
};

export function ConfirmSignupForm({ username }: ConfirmSignupFormProps) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const methods = useForm<ConfirmSignupFormValues>({
    defaultValues: {
      username,
    },
  });

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
                className="font-semibold text-gray-900 hover:text-gray-500"
                onClick={onResendCode}
              >
                Resend Verification Code
              </button>
            }
          />

          <div className="mt-6">
            <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Confirming...' : 'Confirm'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
