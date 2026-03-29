'use client';

import { useEffect } from 'react';

import { ErrorFallback } from '@/components/molecules/error-fallback';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error caught:', {
      message: error.message,
      digest: error.digest,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
  }, [error]);

  return <ErrorFallback error={error} reset={reset} />;
}
