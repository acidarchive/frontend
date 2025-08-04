import { Icons } from '@/components/atoms/icons';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[450px]">
      <Icons.refreshCw className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
      <p className="text-muted-foreground">
        The backend may take a moment to wake up.
      </p>
      <p className="text-muted-foreground">Thanks for your patience!</p>
    </div>
  );
}
