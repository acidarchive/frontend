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
        'block w-full relative cursor-pointer',
        disabled && 'cursor-default',
      )}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    >
      <span
        className={clsx(
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
          checked ? 'opacity-100' : 'opacity-0',
        )}
      >
        ●
      </span>
    </Checkbox>
  );
}
