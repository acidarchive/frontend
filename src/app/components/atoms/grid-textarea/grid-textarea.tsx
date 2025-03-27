import { Textarea as HeadlessTextarea } from '@headlessui/react';

import styles from './grid-textarea.module.scss';

type GridTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function GridTextarea({ ...props }: GridTextareaProps) {
  return <HeadlessTextarea {...props} className={styles.gridTextarea} />;
}
