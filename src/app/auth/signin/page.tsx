import Link from 'next/link';

import { SigninForm } from '@/app/components/organisms/auth/signin-form';

export default function SigninPage() {
  return (
    <>
      <h2 className="mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 font-sans">
        Sign in to your account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SigninForm />

        <p className="mt-10 text-center text-sm/6 text-gray-500 font-sans">
          Not a member?{' '}
          <Link
            href="/auth/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </>
  );
}
