'use client';

import Link from 'next/link';

import { PasswordInput } from '@/components/atoms/password-input';
import { FormAlert } from '@/components/molecules/form-alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface SigninFormProps {
  onSubmit: (data: { username: string; password: string }) => void;
  error?: string;
  isPending?: boolean;
  defaultUsername?: string;
}

export function SigninForm({
  onSubmit,
  error,
  isPending = false,
  defaultUsername,
}: SigninFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit({
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    });
  }

  return (
    <Card className="w-full max-w-lg">
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <FormAlert variant="destructive" className="mb-4" message={error} />
          <FieldSet className="gap-4">
            <Field>
              <FieldLabel htmlFor="username">Username or email</FieldLabel>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Username or email"
                autoComplete="username"
                defaultValue={defaultUsername}
                required
              />
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/auth/reset-password/submit"
                  className="text-sm font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </Field>

            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>

              <FieldDescription className="text-center">
                Not a member?{' '}
                <Link href="/auth/signup">Create a new account</Link>
              </FieldDescription>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
