'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { ErrorFallback } from '@/components/molecules/error-fallback';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    queryClient.removeQueries({ queryKey: ['/v1/patterns/tb303/random'] });
    reset();
  };

  return <ErrorFallback error={error} reset={handleRetry} />;
}
