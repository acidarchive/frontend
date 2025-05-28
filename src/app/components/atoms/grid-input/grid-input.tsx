import { Input } from '@headlessui/react';

type GridInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function GridInput({ ...props }: GridInputProps) {
  return (
    <div className="w-full h-full">
      <Input
        {...props}
        className="w-full h-full border-none text-sm text-gray-900 bg-transparent"
      />
    </div>
  );
}
