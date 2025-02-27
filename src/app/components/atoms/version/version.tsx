import styles from './version.module.scss';

export const Version: React.FC = () => {
  return (
    <span className={styles.version}>
      Version: {process.env.NEXT_PUBLIC_APP_VERSION}
    </span>
  );
};
