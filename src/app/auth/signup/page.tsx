import Link from 'next/link';

import { SignupForm } from '@/app/components/organisms/auth/signup-form';

export default function Login() {
  return (
    <>
      <h2 className="mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 font-sans">
        Create a new account
      </h2>

      <SignupForm />

      <p className="mt-10 text-center text-sm/6 text-gray-500 font-sans">
        Already have an account?{' '}
        <Link
          href="/auth/signin"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
