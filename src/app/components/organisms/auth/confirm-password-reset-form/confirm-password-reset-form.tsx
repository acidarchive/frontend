'use client';
import { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/app/components/atoms/button';
import { ErrorMessage } from '@/app/components/atoms/error-message';
import { InputElement } from '@/app/components/molecules/input-element';
import { handleConfirmResetPassword } from '@/lib/cognito-actions';
import {
  email_validation,
  password_validation,
  verification_code_validation,
} from '@/utils/input-validations';
export interface ConfirmPasswordResetFormProps {
  email: string;
}
type ConfirmPasswordResetFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
};

export function ConfirmPasswordResetForm({
  email,
}: ConfirmPasswordResetFormProps) {
  const methods = useForm<ConfirmPasswordResetFormValues>({
    defaultValues: {
      email,
    },
  });
  const [error, setError] = useState<string>('');

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const password = useWatch({
    name: 'password',
    control: control,
  });

  const onSubmit = handleSubmit(async data => {
    setError('');
    const result = await handleConfirmResetPassword(data);
    if (result?.error) {
      setError(result.error);
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
          <InputElement {...email_validation} disabled />
          <InputElement {...verification_code_validation} />
          <InputElement {...password_validation} label="New password" />
          <InputElement
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            validation={{
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match',
            }}
          />

          <div className="mt-6">
            <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Resetting...' : 'Reset password'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
