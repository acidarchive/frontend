import { Input } from '@headlessui/react';

type GridInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function GridInput({ ...props }: GridInputProps) {
  return (
    <div className="w-full h-full">
      <Input
        {...props}
        className="w-full h-full p-[1%] border-none text-base font-sans bg-transparent"
      />
    </div>
  );
}
