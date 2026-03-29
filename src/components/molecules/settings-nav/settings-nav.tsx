'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactElement } from 'react';

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
  icon: ReactElement;
}

interface SettingsNavProps {
  items: SettingsNavItem[];
}

interface NavLinkProps {
  item: SettingsNavItem;
  active: boolean;
}

function NavLink({ item, active }: NavLinkProps) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'justify-start gap-2',
        active
          ? 'bg-muted hover:bg-muted'
          : 'hover:bg-transparent hover:underline',
      )}
    >
      {item.icon}
      <span className="text-base">{item.title}</span>
    </Link>
  );
}

export function SettingsNav({ items }: SettingsNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;
  const handleNavChange = (value: string) => router.push(value);

  return (
    <>
      {/* Mobile: Select dropdown */}
      <div className="md:hidden">
        <Select value={pathname} onValueChange={handleNavChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a page" />
          </SelectTrigger>
          <SelectContent>
            {items.map(item => (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-base">{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: Sidebar navigation */}
      <ScrollArea className="hidden w-full md:block">
        <nav
          aria-label="Settings navigation"
          className="flex gap-2 lg:flex-col"
        >
          {items.map(item => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </nav>
        {/* Horizontal scroll visible on md screens only */}
        <ScrollBar orientation="horizontal" className="lg:hidden" />
      </ScrollArea>
    </>
  );
}
