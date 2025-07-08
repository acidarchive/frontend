import Link from 'next/link';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { SignupForm } from '@/components/organisms/auth/signup-form';

export default function Login() {
  return (
    <AuthLayout>
      <h2 className="mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 font-sans">
        Create a new account
      </h2>

      <SignupForm />

      <p className="mt-10 text-center text-sm/6 text-gray-500 font-sans">
        Already have an account?{' '}
        <Link
          href="/auth/signin"
          className="font-semibold text-gray-950 hover:text-gray-500"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
