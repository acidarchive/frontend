import { Radio, RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

import { Sawtooth } from './sawtooth';
import { Square } from './square';
import styles from './waveform-select.module.scss';

export enum Waveform {
  Square = 'square',
  Sawtooth = 'sawtooth',
}

export interface WaveformSelectProps {
  value?: Waveform;
  defaultValue?: Waveform;
  onChange?: (value: Waveform) => void;
  disabled?: boolean;
}
export const WaveformSelect = ({
  value,
  defaultValue = Waveform.Sawtooth,
  onChange,
  disabled = false,
}: WaveformSelectProps) => {
  const handleChange = (selectedValue: Waveform) => {
    onChange?.(selectedValue);
  };
  return (
    <RadioGroup
      value={value || defaultValue}
      className={clsx(styles.waveformSelect, { [styles.disabled]: disabled })}
      disabled={disabled}
      onChange={handleChange}
    >
      <div className={styles.label}>Waveform</div>
      <div className={styles.options}>
        <Radio
          value={Waveform.Sawtooth}
          className={({ checked }) =>
            clsx(styles.option, { [styles.active]: checked })
          }
        >
          <Sawtooth />
        </Radio>
        <Radio
          value={Waveform.Square}
          className={({ checked }) =>
            clsx(styles.option, { [styles.active]: checked })
          }
        >
          <Square />
        </Radio>
      </div>
    </RadioGroup>
  );
};
