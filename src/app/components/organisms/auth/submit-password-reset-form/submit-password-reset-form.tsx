'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/app/components/atoms/button';
import { ErrorMessage } from '@/app/components/atoms/error-message';
import { InputElement } from '@/app/components/molecules/input-element';
import { email_validation } from '@/app/utils/input-validations';
import { handleResetPassword } from '@/lib/cognito-actions';

type SubmitPasswordResetFormValues = {
  email: string;
};

export function SubmitPasswordResetForm() {
  const methods = useForm<SubmitPasswordResetFormValues>();
  const [error, setError] = useState<string>('');

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    setError('');
    const result = await handleResetPassword(data);
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
          <InputElement {...email_validation} />
          <div className="mt-6">
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send code'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
