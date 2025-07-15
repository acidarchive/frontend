'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/components/atoms/error-message';
import { InputElement } from '@/components/molecules/input-element';
import { Button } from '@/components/ui/button';
import { handleResetPassword } from '@/lib/cognito-actions';
import { email_validation } from '@/utils/input-validations';

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
              className="w-full"
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
