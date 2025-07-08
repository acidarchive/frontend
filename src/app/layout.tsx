import '@/styles/globals.css';

import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import ConfigureAmplifyClientSide from '@/app/amplify-cognito-config';
import { UserProvider } from '@/context/user-context';
import QueryProvider from '@/providers/query-provider';

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

        <UserProvider>
          <QueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </QueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
