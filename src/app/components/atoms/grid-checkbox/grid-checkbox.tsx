'use client';

import { Checkbox } from '@headlessui/react';
import { clsx } from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

interface GridCheckboxProps {
  id?: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
}

export function GridCheckbox({
  id,
  name,
  checked = false,
  disabled = false,
}: GridCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={checked}
      render={({ field: { onChange, value } }) => (
        <Checkbox
          id={id}
          name={name}
          checked={value || false}
          disabled={disabled}
          className={clsx(
            'w-full h-full flex items-center justify-center',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          onChange={onChange}
        >
          <span
            className={clsx(
              'text-gray-900 text-center text-sm leading-none transition-opacity duration-150',
              value || false ? 'opacity-100' : 'opacity-0',
            )}
          >
            ●
          </span>
        </Checkbox>
      )}
    />
  );
}
