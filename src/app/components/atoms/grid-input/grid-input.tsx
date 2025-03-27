import { Input } from '@headlessui/react';

import styles from './grid-input.module.scss';

type GridInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function GridInput({ ...props }: GridInputProps) {
  return (
    <div className={styles.container}>
      <Input {...props} className={styles.input} />
    </div>
  );
}
