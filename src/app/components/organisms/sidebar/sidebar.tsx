'use client';

import clsx from 'clsx';
import { Drum, KeyboardMusic, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Smiley } from '@/app/components/atoms/smiley';

const navigation = [
  {
    name: 'TB-303',
    href: '/dashboard/tb303',
    icon: KeyboardMusic,
    current: true,
  },
  { name: 'TR-606', href: '/dashboard/tr606', icon: Drum, current: false },
];

export function Sidebar({ isStatic = false }) {
  const pathName = usePathname();

  const sidebarContent = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Smiley />
        <h1 className="hidden text-[1.65rem] font-bold text-gray-100 md:block absolute translate-x-[1.5em] translate-y-[0.1em]">
          Acid Archive
        </h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'group flex gap-x-3 p-2 text-sm/6 font-semibold',
                      {
                        'bg-gray-800 text-white': pathName === item.href,
                        'text-gray-400 hover:bg-gray-800 hover:text-white':
                          pathName !== item.href,
                      },
                    )}
                  >
                    <item.icon aria-hidden="true" className="size-6 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              href="/dashboard/settings"
              className={clsx(
                'group -mx-2 flex gap-x-3 p-2 text-sm/6 font-semibold',
                {
                  'bg-gray-800 text-white': pathName === '/dashboard/settings',
                  'text-gray-400 hover:bg-gray-800 hover:text-white':
                    pathName !== '/dashboard/settings',
                },
              )}
            >
              <Settings aria-hidden="true" className="size-6 shrink-0" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  if (isStatic) {
    return (
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {sidebarContent}
      </div>
    );
  }

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
      {sidebarContent}
    </div>
  );
}
