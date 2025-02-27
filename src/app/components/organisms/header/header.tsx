import clsx from 'clsx';
import Link from 'next/link';

import { Button } from '@/app/components/atoms/button';
import { Smiley } from '@/app/components/atoms/smiley';

import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <nav className={styles.header}>
      <Link href="/" className={clsx(styles.brand, styles.link)}>
        <Smiley />
        <span>Acid Archive</span>
      </Link>

      <div className={styles.menu}></div>

      <div className={styles.actions}>
        <Button href="https://github.com/acidarchive">github</Button>
      </div>
    </nav>
  );
};
