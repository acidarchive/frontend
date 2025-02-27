import { Version } from '@/app/components/atoms/version';

import styles from './footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Acid Archive
        <a href="mailto:info@acidarchive.com">info@acidarchive.com</a>
        <Version />
      </p>
    </footer>
  );
};
