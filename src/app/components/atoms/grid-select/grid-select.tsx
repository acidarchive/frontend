import { Select } from '@headlessui/react';
import clsx from 'clsx';

export interface GridSelectOption {
  value: string;
  label: string;
}

type GridSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: GridSelectOption[];
  allowEmpty?: boolean;
};

export function GridSelect({
  options,
  allowEmpty,
  value,
  ...props
}: GridSelectProps) {
  return (
    <Select
      {...props}
      value={value ?? undefined}
      className={clsx(
        'appearance-none bg-transparent border-none p-0',
        'text-center w-full h-full outline-none text-gray-900 text-sm',
      )}
    >
      {allowEmpty && <option value=""> </option>}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
