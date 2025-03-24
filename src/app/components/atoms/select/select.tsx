import styles from './select.module.scss';

interface SelectProps {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export const Select = ({ value, disabled, onChange, options }: SelectProps) => {
  return (
    <div className={styles.select}>
      <select
        disabled={disabled}
        value={value}
        onChange={event => onChange(event.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
