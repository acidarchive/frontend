'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface SettingsNavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SettingsNavProps {
  items: SettingsNavItem[];
}

export function SettingsNav({ items }: SettingsNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Mobile: Select dropdown */}
      <div className="md:hidden">
        <Select
          value={pathname}
          onValueChange={(value) => router.push(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a page" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: Sidebar navigation */}
      <ScrollArea className="hidden w-full md:block">
        <nav className="flex gap-2 lg:flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'justify-start gap-2',
                pathname === item.href
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <ScrollBar orientation="horizontal" className="lg:hidden" />
      </ScrollArea>
    </>
  );
}
