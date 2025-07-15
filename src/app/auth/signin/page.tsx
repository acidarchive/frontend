import Link from 'next/link';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { SigninForm } from '@/components/organisms/auth/signin-form';

export default function SigninPage() {
  return (
    <AuthLayout>
      <h2 className="mb-10 text-center text-2xl/9 font-bold">
        Sign in to your account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SigninForm />

        <p className="mt-10 text-center text-sm">
          Not a member?{' '}
          <Link href="/auth/signup" className="font-semibold hover:underline">
            Create a new account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
