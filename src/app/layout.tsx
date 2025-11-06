import '@/styles/globals.css';

import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Fira_Code, Oxanium } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { UserProvider } from '@/context/user-context';
import ConfigureAmplifyClientSide from '@/lib/cognito-config';
import QueryProvider from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

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
      suppressHydrationWarning
      className={clsx(oxanium.variable, firaCode.variable, 'h-full')}
    >
      <body className="h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            showSpinner={false}
            color="hsl(53deg 100% 50%)"
            height={0.5}
          />
          <ConfigureAmplifyClientSide />
          <UserProvider>
            <QueryProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </QueryProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
