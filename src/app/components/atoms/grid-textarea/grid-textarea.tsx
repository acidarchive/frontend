import { Textarea as HeadlessTextarea } from '@headlessui/react';

type GridTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function GridTextarea({ ...props }: GridTextareaProps) {
  return (
    <HeadlessTextarea
      {...props}
      className="w-full h-full p-[1%] border-none text-base font-sans bg-transparent"
    />
  );
}
