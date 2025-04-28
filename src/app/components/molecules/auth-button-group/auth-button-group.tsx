import Link from 'next/link';

export const AuthButtonGroup = () => (
  <>
    <Link
      href="/auth/signin"
      className="font-sans hidden text-sm font-semibold text-gray-900 lg:block"
    >
      Sign in
    </Link>
    <Link
      href="/auth/signup"
      className="border border-gray-950 bg-gray-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-white hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      Sign up
    </Link>
  </>
);
