import { Select } from '@headlessui/react';

export interface GridSelectOption {
  value: string;
  label: string;
}

type GridSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: GridSelectOption[];
  allowEmpty?: boolean;
};

export function GridSelect({ options, allowEmpty, ...props }: GridSelectProps) {
  return (
    <Select
      {...props}
      className="appearance-none bg-transparent border-none p-0 text-center w-full h-full outline-none 
        disabled:text-gray-950 disabled:opacity-100
     "
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
