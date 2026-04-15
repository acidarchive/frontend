'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';

export function DashboardBackLink() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length <= 2) return null;

  const backPath = '/' + segments.slice(0, 2).join('/');

  return (
    <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1">
      <Link href={backPath}>
        <Icons.ChevronLeft />
        Back
      </Link>
    </Button>
  );
}
