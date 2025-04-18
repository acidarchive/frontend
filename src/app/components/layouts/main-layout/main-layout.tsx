import React from 'react';

import { Footer } from '@/app/components/organisms/footer';
import { Header } from '@/app/components/organisms/header';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
