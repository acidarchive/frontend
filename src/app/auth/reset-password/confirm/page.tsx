'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { ConfirmPasswordResetForm } from '@/components/organisms/auth/confirm-password-reset-form';

function ConfirmPasswordReset() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <AuthLayout>
      <h2 className="mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 font-sans">
        Reset password
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <ConfirmPasswordResetForm email={email} />
      </div>
    </AuthLayout>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <ConfirmPasswordReset />
    </Suspense>
  );
}
