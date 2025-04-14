'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import { Smiley } from '@/app/components/atoms/smiley';
const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Patterns', href: '#' },
  { name: 'About', href: '#' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 flex justify-center h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-3 p-3 md:hidden"
            >
              <Bars3Icon aria-hidden="true" className="size-5 text-gray-900" />
            </button>
            <Link
              href="/"
              className="font-sans inline-flex items-center gap-[0.3em]"
            >
              <Smiley />
              <h1 className="hidden text-[1.65rem] font-bold text-gray-900 md:block absolute translate-x-[1.5em] translate-y-[0.1em]">
                Acid Archive
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold md:text-gray-700">
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="font-sans text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-x-8">
            <a
              href="#"
              className="font-sans hidden text-sm/6 font-semibold text-gray-900 lg:block"
            >
              Log in
            </a>
            <a
              href="#"
              className="font-sans rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </a>
          </div>
        </div>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
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
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
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
