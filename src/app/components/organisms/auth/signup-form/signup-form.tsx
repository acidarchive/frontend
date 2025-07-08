'use client';
import { useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/app/components/atoms/button';
import { ErrorMessage } from '@/app/components/atoms/error-message';
import { InputElement } from '@/app/components/molecules/input-element';
import {
  email_validation,
  password_validation,
  username_validation,
} from '@/app/utils/input-validations';
import { handleSignUp } from '@/lib/cognito-actions';

type SignupFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm() {
  const methods = useForm<SignupFormValues>();
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
    const result = await handleSignUp(data);

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
          <InputElement {...username_validation} />
          <InputElement {...email_validation} />
          <InputElement {...password_validation} />
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
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
