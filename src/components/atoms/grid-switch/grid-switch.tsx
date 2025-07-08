'use client';

import { Switch } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';

export interface GridSwitchProps {
  name: string;
  defaultValue?: boolean;
  disabled?: boolean;
}

export function GridSwitch({
  name,
  defaultValue,
  disabled = false,
}: GridSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Switch
          name={name}
          checked={value ?? false}
          onChange={onChange}
          disabled={disabled}
          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-hidden data-checked:bg-gray-600"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 transform bg-white shadow-sm transition duration-200 ease-in-out group-data-checked:translate-x-5"
          />
        </Switch>
      )}
    />
  );
}
