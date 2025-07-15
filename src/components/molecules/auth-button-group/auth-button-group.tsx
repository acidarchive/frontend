import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const AuthButtonGroup = () => (
  <>
    <Button variant="ghost" asChild>
      <Link
        href="/auth/signin"
        className="font-sans hidden text-sm font-semibold lg:block"
      >
        Sign in
      </Link>
    </Button>
    <Button asChild>
      <Link href="/auth/signup" className="font-sans text-sm font-semibold">
        Sign up
      </Link>
    </Button>
  </>
);
