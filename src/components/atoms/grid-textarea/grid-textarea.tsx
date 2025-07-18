import { Textarea as HeadlessTextarea } from '@headlessui/react';

type GridTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function GridTextarea({ ...props }: GridTextareaProps) {
  return (
    <HeadlessTextarea
      {...props}
      className="w-full h-full border-none text-sm bg-transparent p-4 resize-none focus:ring-0 focus:outline-none"
    />
  );
}
