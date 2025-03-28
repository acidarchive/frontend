import { Select } from '@headlessui/react';

import styles from './grid-select.module.scss';

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
    <Select {...props} className={styles.gridSelect}>
      {allowEmpty && <option value=""> </option>}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
