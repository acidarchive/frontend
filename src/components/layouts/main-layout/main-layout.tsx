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
      <main className="flex-1 flex justify-center px-4 mt-16">{children}</main>
      <Footer />
    </div>
  );
}
