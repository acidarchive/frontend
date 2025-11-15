'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { SigninForm } from '@/components/organisms/auth/signin-form';
import { useUser } from '@/context/user-context';
import { handleSignIn } from '@/dal/auth';

export function SigninPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultUsername = searchParams.get('username') ?? undefined;
  const { refreshUser } = useUser();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function onSubmit(data: { username: string; password: string }) {
    setPending(true);
    setError(undefined);

    const result = await handleSignIn(data);

    if (result?.error) {
      setError(result.error);
      setPending(false);
      return;
    }

    await refreshUser();

    if (result?.redirect) {
      router.push(result.redirect);
      return;
    }

    router.push('/dashboard/tb303');
  }

  return (
    <SigninForm
      onSubmit={onSubmit}
      error={error}
      isPending={pending}
      defaultUsername={defaultUsername}
    />
  );
}
