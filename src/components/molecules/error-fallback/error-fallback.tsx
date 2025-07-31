import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}
export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Something went wrong.</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{error.message}</p>
      <Button onClick={resetErrorBoundary} size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}
