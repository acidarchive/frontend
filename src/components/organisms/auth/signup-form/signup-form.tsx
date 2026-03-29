'use client';

import Link from 'next/link';

import { PasswordInput } from '@/components/atoms/password-input';
import { FormAlert } from '@/components/molecules/form-alert';
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
import type { SignupFormState } from '@/lib/definitions';

interface SignupFormProps {
  action: (formData: FormData) => void;
  formError?: string;
  fieldErrors?: SignupFormState['fieldErrors'];
  defaultValues?: SignupFormState['data'];
  isPending?: boolean;
}

export function SignupForm({
  action,
  formError,
  fieldErrors,
  defaultValues,
  isPending = false,
}: SignupFormProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardContent>
        <form action={action} noValidate>
          <FormAlert
            variant="destructive"
            className="mb-4"
            message={formError}
          />
          <FieldSet className="gap-4">
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                defaultValue={defaultValues?.username}
                autoComplete="username"
                required
              />
              <FieldError>{fieldErrors?.username?.at(0)}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="me@example.com"
                defaultValue={defaultValues?.email}
                autoComplete="email"
                required
              />
              <FieldError>{fieldErrors?.email?.at(0)}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
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
                {isPending ? 'Signing up...' : 'Sign up'}
              </Button>

              <FieldDescription className="text-center">
                Already have an account?{' '}
                <Link href="/auth/signin">Sign In</Link>
              </FieldDescription>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
