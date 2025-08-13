'use client';

import { useEffect } from 'react';

import { ErrorFallback } from '@/components/molecules/error-fallback';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      resetErrorBoundary={() => globalThis.location.reload()}
    />
  );
}
