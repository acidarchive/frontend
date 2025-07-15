'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { ConfirmSignupForm } from '@/components/organisms/auth/confirm-signup-form';

function ConfirmSignup() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username') || '';

  return (
    <AuthLayout>
      <h2 className="mb-10 text-center text-2xl/9 font-bold">
        Confirm your account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ConfirmSignupForm username={username} />
      </div>
    </AuthLayout>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <ConfirmSignup />
    </Suspense>
  );
}
