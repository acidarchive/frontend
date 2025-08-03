'use client';

import { clsx } from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface CyclableInputOption<T = string> {
  value: T;
  label: string;
}

interface CyclableInputProps<T = string> {
  options: CyclableInputOption<T>[];
  id: string;
  name: string;
  disabled?: boolean;
  defaultValue?: T;
  className?: string;
  clearable?: boolean;
}

export function CyclableInput<T = string>({
  options,
  id,
  name,
  disabled = false,
  defaultValue,
  className,
  clearable = false,
}: CyclableInputProps<T>) {
  const { control, setValue } = useFormContext();

  const extendedOptions = React.useMemo(() => {
    if (clearable) {
      const clearOption: CyclableInputOption<T> = {
        value: '' as T,
        label: '',
      };
      return [clearOption, ...options];
    }
    return options;
  }, [options, clearable]);

  const cycleValue = (
    currentValue: T | undefined,
    direction: 'forward' | 'backward',
  ): T => {
    const currentIndex = extendedOptions.findIndex(
      option => option.value === currentValue,
    );

    const nextIndex =
      direction === 'forward'
        ? (currentIndex + 1) % extendedOptions.length
        : (currentIndex - 1 + extendedOptions.length) % extendedOptions.length;

    return extendedOptions[nextIndex].value;
  };

  const handleClick = (currentValue: T | undefined) => {
    if (disabled) return;
    const newValue = cycleValue(currentValue, 'forward');
    setValue(name, newValue);
  };

  const handleContextMenu = (
    event: React.MouseEvent,
    currentValue: T | undefined,
  ) => {
    event.preventDefault();
    if (disabled) return;
    const newValue = cycleValue(currentValue, 'backward');
    setValue(name, newValue);
  };

  const getCurrentLabel = (value: T | undefined): string => {
    return extendedOptions.find(option => option.value === value)?.label || '';
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div
          id={id}
          className={clsx(
            'flex items-center cursor-pointer w-full h-full justify-center select-none text-sm',
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          onClick={() => handleClick(field.value)}
          onContextMenu={event => handleContextMenu(event, field.value)}
          role="button"
          tabIndex={disabled ? -1 : 0}
        >
          {getCurrentLabel(field.value)}
        </div>
      )}
    />
  );
}
