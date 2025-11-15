import { Suspense } from 'react';

import { Loader } from '@/components/atoms/loader';
import { ConfirmResetPassword } from '@/features/auth';

export default function Page() {
  return (
    <>
      <h2 className="mb-10 text-center text-2xl/9 font-bold">Reset password</h2>
      <Suspense fallback={<Loader />}>
        <ConfirmResetPassword />
      </Suspense>
    </>
  );
}
