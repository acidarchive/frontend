import { Controller, useFormContext } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export interface GridTextareaProps {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
}

export function GridTextarea({
  name,
  defaultValue,
  disabled = false,
  className,
  ...props
}: GridTextareaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Textarea
          {...field}
          {...props}
          disabled={disabled}
          value={field.value ?? ''}
          className={cn(
            'h-full w-full resize-none border-none bg-transparent p-4 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent',
            className,
          )}
        />
      )}
    />
  );
}
