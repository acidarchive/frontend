'use client';

import { Input } from '@headlessui/react';
import { type RegisterOptions, useFormContext } from 'react-hook-form';

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
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, options)}
        className="w-full h-full border-none text-sm text-gray-900 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
      />
    </div>
  );
}
