'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import { Smiley } from '@/components/atoms/smiley';
import { useUser } from '@/context/user-context';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Patterns', href: '/patterns' },
  { name: 'About', href: '/about' },
];

import { ModeToggle } from '@/components/atoms/mode-toggle/mode-toggle';
import { AuthButtonGroup } from '@/components/molecules/auth-button-group';
import { UserNavigation } from '@/components/molecules/user-navigation';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, isLoading } = useUser();

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-3 p-3 md:hidden"
            >
              <Bars3Icon aria-hidden="true" className="size-5" />
            </button>
            <Link
              href="/"
              className="font-sans inline-flex items-center gap-[0.3em]"
            >
              <Smiley />
              <h1 className="hidden text-[1.65rem] font-bold md:block absolute translate-x-[1.5em] translate-y-[0.1em]">
                Acid Archive
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold">
            {navigation.map((item, index) => (
              <Link key={index} href={item.href} className="font-sans">
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-x-4">
            {user && !isLoading ? (
              <UserNavigation />
            ) : isLoading ? (
              <div className="h-4 w-16" />
            ) : (
              <AuthButtonGroup />
            )}
            <ModeToggle />
          </div>
        </div>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-accent px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 p-2.5 text-gray-700"
              >
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  <Smiley />
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 font-semibold hover:underline"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
};
