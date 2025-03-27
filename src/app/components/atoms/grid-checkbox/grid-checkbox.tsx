import { Checkbox } from '@headlessui/react';
import clsx from 'clsx';

import styles from './grid-checkbox.module.scss';

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
      className={clsx(styles.checkbox, checked && styles.checked)}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    >
      <span className={styles.checkmark}>●</span>
    </Checkbox>
  );
}
