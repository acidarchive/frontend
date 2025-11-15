'use client';

import { Alert } from '@/components/molecules/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { ConfirmSignupFormState } from '@/lib/definitions';

interface ConfirmSignupFormProps {
  confirmSignUpAction: (formData: FormData) => void;
  resendSignupCodeAction: (formData: FormData) => void;
  defaultValues?: ConfirmSignupFormState['data'];
  fieldErrors?: ConfirmSignupFormState['fieldErrors'];
  formError?: string;
  message?: string;
  isPending?: boolean;
  isResendPending?: boolean;
}

export function ConfirmSignupForm({
  confirmSignUpAction,
  resendSignupCodeAction,
  formError,
  message,
  fieldErrors,
  isPending,
  isResendPending,
  defaultValues,
}: ConfirmSignupFormProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardContent>
        <form action={confirmSignUpAction} noValidate autoComplete="off">
          <Alert className="mb-4">{message}</Alert>
          <Alert variant="destructive" className="mb-4">
            {formError}
          </Alert>
          <FieldSet className="gap-4">
            <Field>
              <FieldLabel htmlFor="username-display">Username</FieldLabel>
              <Input
                id="username-display"
                type="text"
                placeholder="Username"
                defaultValue={defaultValues?.username}
                autoComplete="off"
                disabled
              />
              <input
                type="hidden"
                name="username"
                value={defaultValues?.username}
              />
              <FieldError>{fieldErrors?.username?.at(0)}</FieldError>
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="code">Verification Code</FieldLabel>
                <Button
                  type="submit"
                  variant="link"
                  formAction={resendSignupCodeAction}
                  disabled={isResendPending}
                >
                  {isResendPending ? 'Sending...' : 'Resend confirmation code'}
                </Button>
              </div>
              <Input
                id="code"
                type="text"
                name="code"
                placeholder="Verification Code"
                inputMode="numeric"
                defaultValue={defaultValues?.code}
                autoComplete="one-time-code"
              />
              <FieldError>{fieldErrors?.code?.at(0)}</FieldError>
            </Field>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Confirming...' : 'Confirm'}
              </Button>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
