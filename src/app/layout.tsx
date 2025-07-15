import '@/styles/globals.css';

import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Fira_Code, Oxanium } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { UserProvider } from '@/context/user-context';
import ConfigureAmplifyClientSide from '@/lib/cognito-config';
import QueryProvider from '@/providers/query-provider';

const oxanium = Oxanium({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oxanium',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
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
    <html
      lang="en"
      className={clsx(oxanium.variable, firaCode.variable, 'h-full')}
    >
      <body className="h-full flex flex-col">
        <NextTopLoader showSpinner={false} />
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
