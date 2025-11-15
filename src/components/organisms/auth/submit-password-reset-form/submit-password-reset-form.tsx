'use client';

import { Alert } from '@/components/molecules/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PasswordResetFormState } from '@/lib/definitions';

interface SubmitPasswordResetFormProps {
  resetAction: (formData: FormData) => void;
  defaultValues?: PasswordResetFormState['data'];
  fieldErrors?: PasswordResetFormState['fieldErrors'];
  formError?: string;
  isPending?: boolean;
}

export function SubmitPasswordResetForm({
  resetAction,
  defaultValues,
  fieldErrors,
  formError,
  isPending,
}: SubmitPasswordResetFormProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardContent>
        <form action={resetAction} noValidate autoComplete="off">
          <Alert variant="destructive" className="mb-4">
            {formError}
          </Alert>
          <FieldSet className="gap-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="me@example.com"
                inputMode="email"
                defaultValue={defaultValues?.email}
                autoComplete="email"
                required
              />
              <FieldError>{fieldErrors?.email?.at(0)}</FieldError>
            </Field>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Sending...' : 'Send code'}
              </Button>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
