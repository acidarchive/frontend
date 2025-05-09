import { Checkbox } from '@headlessui/react';
import clsx from 'clsx';

interface GridCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

export function GridCheckbox({
  checked = false,
  disabled = false,
  onChange,
}: GridCheckboxProps) {
  return (
    <Checkbox
      className={clsx(
        'w-full h-full flex items-center justify-center cursor-pointer',
        disabled && 'cursor-default',
      )}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    >
      <span
        className={clsx(
          'text-gray-500 text-center text-sm leading-none',
          checked ? 'opacity-100' : 'opacity-0',
        )}
      >
        ●
      </span>
    </Checkbox>
  );
}
