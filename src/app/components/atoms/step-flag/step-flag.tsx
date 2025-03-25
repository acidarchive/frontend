import styles from './step-flag.module.scss';

export interface StepFlagProps {
  value?: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export const StepFlag = ({
  value,
  disabled,
  onChange,
  className,
}: StepFlagProps) => {
  return (
    <label className={`${styles.container} ${className || ''}`}>
      <input
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={event => onChange(event.target.checked)}
        className={styles.hiddenCheckbox}
      />
      <span className={styles.customCheckbox}>
        <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="6" fill="black" />
        </svg>
      </span>
    </label>
  );
};
