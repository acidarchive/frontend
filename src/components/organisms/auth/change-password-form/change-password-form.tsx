'use client';

import { PasswordInput } from '@/components/atoms/password-input';
import { FormAlert } from '@/components/molecules/form-alert';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import type { ChangePasswordFormState } from '@/lib/definitions';

interface ChangePasswordFormProps {
  action: (formData: FormData) => void;
  formError?: string;
  fieldErrors?: ChangePasswordFormState['fieldErrors'];
  defaultValues?: ChangePasswordFormState['data'];
  isPending?: boolean;
}

export function ChangePasswordForm({
  action,
  formError,
  fieldErrors,
  defaultValues,
  isPending = false,
}: ChangePasswordFormProps) {
  return (
    <form action={action} noValidate>
      <FormAlert variant="destructive" className="mb-4" message={formError} />
      <FieldSet className="gap-4">
        <Field>
          <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
          <PasswordInput
            id="current-password"
            name="currentPassword"
            defaultValue={defaultValues?.currentPassword}
            autoComplete="current-password"
            required
          />
          <FieldError>{fieldErrors?.currentPassword?.at(0)}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="new-password">New Password</FieldLabel>
          <PasswordInput
            id="new-password"
            name="newPassword"
            defaultValue={defaultValues?.newPassword}
            autoComplete="new-password"
            required
          />
          <FieldError>{fieldErrors?.newPassword?.at(0)}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-new-password">
            Confirm New Password
          </FieldLabel>
          <PasswordInput
            id="confirm-new-password"
            name="confirmNewPassword"
            defaultValue={defaultValues?.confirmNewPassword}
            autoComplete="new-password"
            required
          />
          <FieldError>{fieldErrors?.confirmNewPassword?.at(0)}</FieldError>
        </Field>

        <Button type="submit" disabled={isPending} className="w-fit">
          {isPending ? 'Changing password...' : 'Change password'}
        </Button>
      </FieldSet>
    </form>
  );
}
