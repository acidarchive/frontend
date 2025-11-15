import { Suspense } from 'react';

import { SigninPage } from '@/features/auth';

export default function Page() {
  return (
    <>
      <h2 className="mb-10 text-center text-2xl/9 font-bold">
        Sign in to your account
      </h2>
      <Suspense>
        <SigninPage />
      </Suspense>
    </>
  );
}
