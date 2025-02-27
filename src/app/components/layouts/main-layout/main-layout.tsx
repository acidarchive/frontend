import React from 'react';

import { Footer } from '@/app/components/organisms/footer';
import { Header } from '@/app/components/organisms/header';

import styles from './main-layout.module.scss';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};
