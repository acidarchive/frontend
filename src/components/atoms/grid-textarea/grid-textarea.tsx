import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type GridTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function GridTextarea({ className, ...props }: GridTextareaProps) {
  return (
    <Textarea
      className={cn(
        'h-full w-full resize-none border-none bg-transparent p-4 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent',
        className,
      )}
      {...props}
    />
  );
}
