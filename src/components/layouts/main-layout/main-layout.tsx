import React from 'react';

import { Footer } from '@/components/organisms/footer';
import { Header } from '@/components/organisms/header';

interface MainLayoutProps {
  children: React.ReactNode;
}
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 mt-16">
        <div className="w-full max-w-3xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
