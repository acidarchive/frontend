export interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

import styles from './button.module.scss';

export const Button: React.FC<ButtonProps> = ({ children, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
    >
      {children}
    </a>
  );
};
