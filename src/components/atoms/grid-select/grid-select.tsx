'use client';

import { Select } from '@headlessui/react';
import { clsx } from 'clsx';
import { useFormContext } from 'react-hook-form';

export interface GridSelectOption<T = string> {
  value: T;
  label: string;
}

type GridSelectProps<T = string> =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: GridSelectOption<T>[];
    allowEmpty?: boolean;
    id: string;
    name: string;
  };

export function GridSelect<T = string>({
  options,
  allowEmpty,
  id,
  name,
  disabled,
}: GridSelectProps<T>) {
  const { register } = useFormContext();

  return (
    <Select
      id={id}
      disabled={disabled}
      className={clsx(
        'appearance-none bg-transparent border-none p-0',
        'text-center w-full h-full outline-none text-md',
      )}
      {...register(name, {})}
    >
      {allowEmpty && <option value=""> </option>}
      {options.map(option => (
        <option
          key={String(option.value)}
          value={String(option.value)}
          className="text-black"
        >
          {option.label}
        </option>
      ))}
    </Select>
  );
}
