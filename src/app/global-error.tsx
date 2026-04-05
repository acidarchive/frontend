'use client';

import { useEffect } from 'react';

import { ErrorFallback } from '@/components/molecules/error-fallback';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: (options?: { timeout?: number }) => () => void;
}

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  const handleRetry = () => {
    unstable_retry()();
  };

  return (
    <html className="h-full dark">
      <body className="h-full flex flex-col">
        <ErrorFallback error={error} reset={handleRetry} />
      </body>
    </html>
  );
}
