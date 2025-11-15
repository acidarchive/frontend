'use client';

import Link from 'next/link';

import { PasswordInput } from '@/components/atoms/password-input';
import { Alert } from '@/components/molecules/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { ConfirmPasswordResetFormState } from '@/lib/definitions';

interface ConfirmPasswordResetFormProps {
  action: (formData: FormData) => void;
  formError?: string;
  fieldErrors?: ConfirmPasswordResetFormState['fieldErrors'];
  defaultValues?: ConfirmPasswordResetFormState['data'];
  isPending?: boolean;
}

export function ConfirmPasswordResetForm({
  action,
  formError,
  fieldErrors,
  defaultValues,
  isPending = false,
}: ConfirmPasswordResetFormProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardContent>
        <form action={action} noValidate>
          <Alert variant="destructive" className="mb-4">
            {formError}
          </Alert>
          <FieldSet className="gap-4">
            <Field>
              <FieldLabel htmlFor="email-display">Email Address</FieldLabel>
              <Input
                id="email-display"
                type="text"
                placeholder="me@example.com"
                defaultValue={defaultValues?.email}
                autoComplete="off"
                disabled
              />
              <input type="hidden" name="email" value={defaultValues?.email} />
              <FieldError>{fieldErrors?.email?.at(0)}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="code">Verification Code</FieldLabel>
              <Input
                id="code"
                type="text"
                name="code"
                placeholder="123456"
                inputMode="numeric"
                defaultValue={defaultValues?.code}
                autoComplete="one-time-code"
                required
              />
              <FieldError>{fieldErrors?.code?.at(0)}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <PasswordInput
                id="password"
                name="password"
                defaultValue={defaultValues?.password}
                autoComplete="new-password"
                required
              />
              <FieldError>{fieldErrors?.password?.at(0)}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                id="confirm-password"
                name="confirmPassword"
                defaultValue={defaultValues?.confirmPassword}
                autoComplete="new-password"
                required
              />
              <FieldError>{fieldErrors?.confirmPassword?.at(0)}</FieldError>
            </Field>

            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Resetting...' : 'Reset password'}
              </Button>

              <FieldDescription className="text-center">
                Remember your password? <Link href="/auth/signin">Sign In</Link>
              </FieldDescription>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
