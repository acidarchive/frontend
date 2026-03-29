import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';

export interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}
export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <Icons.AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Something went wrong.</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{error.message}</p>
      <Button onClick={reset} size="sm">
        <Icons.RefreshCw className="size-4" aria-hidden="true" />
        Try Again
      </Button>
    </div>
  );
}
