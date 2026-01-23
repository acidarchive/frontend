'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ChangePasswordForm } from '@/components/organisms/auth/change-password-form';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/user-context';
import { changePassword, handleSignOut } from '@/dal/auth';
import type { ChangePasswordFormState } from '@/lib/definitions';

export function ChangePasswordPage() {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [state, setState] = useState<ChangePasswordFormState>({
    data: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  });
  const [pending, setPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setPending(true);

    const data = {
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      confirmNewPassword: formData.get('confirmNewPassword') as string,
    };

    const result = await changePassword(data);
    setState(result);

    if (result.success) {
      await handleSignOut();
      await refreshUser();
      router.push('/auth/signin');
    } else {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-muted-foreground text-sm">
          Update your password. You will be signed out after changing your
          password.
        </p>
      </div>
      <Separator className="my-6 flex-none" />
      <div className="pb-4 lg:max-w-xl">
        <ChangePasswordForm
          action={handleSubmit}
          formError={state?.formErrors?.at(0)}
          fieldErrors={state?.fieldErrors}
          defaultValues={state?.data}
          isPending={pending}
        />
      </div>
    </div>
  );
}
