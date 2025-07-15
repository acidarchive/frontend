'use client';

import { type RegisterOptions, useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';

export interface GridInputProps {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  placeholder?: string;
  validation?: RegisterOptions;
}

export function GridInput({
  type,
  id,
  placeholder = '',
  validation,
  name,
  disabled,
}: GridInputProps) {
  const { register } = useFormContext();

  const options =
    type === 'number'
      ? {
          ...validation,
          setValueAs: (value: string) =>
            value === '' ? undefined : Number(value),
        }
      : validation;

  return (
    <div className="w-full h-full">
      <Input
        id={id}
        type={type}
        className="w-full h-full border-none focus:ring-0 focus:outline-none"
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, options)}
      />
    </div>
  );
}
