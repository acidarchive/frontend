'use client';

import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

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
  const { control } = useFormContext();

  return (
    <div className="w-full h-full">
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <Input
            {...field}
            id={id}
            type={type}
            className="w-full h-full border-none text-md focus:ring-0 focus:outline-none bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:border-none"
            placeholder={disabled ? '' : placeholder}
            disabled={disabled}
            onChange={event => {
              if (type === 'number') {
                const value = event.target.value;
                field.onChange(value === '' ? undefined : Number(value));
              } else {
                field.onChange(event);
              }
            }}
            value={field.value ?? ''}
          />
        )}
      />
    </div>
  );
}
