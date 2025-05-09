import '@/app/styles/globals.css';

import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ConfigureAmplifyClientSide from '@/app/amplify-cognito-config';
import { UserProvider } from '@/app/context/user-context';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Acid Archive',
  description: 'Document, Share, and Explore Acid Patterns ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(inter.variable, 'h-full')}>
      <body className="h-full flex flex-col">
        <ConfigureAmplifyClientSide />
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
