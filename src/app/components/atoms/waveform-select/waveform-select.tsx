export enum Waveform {
  Square = 'square',
  Sawtooth = 'sawtooth',
}

import clsx from 'clsx';

import { Sawtooth } from './sawtooth';
import { Square } from './square';
import styles from './waveform-select.module.scss';

export interface WaveformSelectProps {
  value?: Waveform;
  disabled?: boolean;
  onChange: (value: Waveform) => void;
}
export const WaveformSelect = ({
  value,
  disabled,
  onChange,
}: WaveformSelectProps) => {
  return (
    <div className={styles.waveformSelect}>
      <span>Waveform:</span>
      <div className={styles.options}>
        <label
          className={clsx(styles.option, {
            [styles.active]: value === Waveform.Square,
            [styles.disabled]: disabled,
          })}
        >
          <span className={styles.input}>
            <input
              type="radio"
              name="waveform"
              value={Waveform.Square}
              checked={value === Waveform.Square}
              onChange={() => onChange(Waveform.Square)}
              disabled={disabled}
            />
            <span className={styles.image}>
              <Square />
            </span>
          </span>
        </label>

        <label
          className={clsx(styles.option, {
            [styles.active]: value === Waveform.Sawtooth,
            [styles.disabled]: disabled,
          })}
        >
          <span className={styles.input}>
            <input
              type="radio"
              name="waveform"
              value={Waveform.Sawtooth}
              checked={value === Waveform.Sawtooth}
              onChange={() => onChange(Waveform.Sawtooth)}
              disabled={disabled}
            />
            <span className={styles.inputControl}>
              <Sawtooth />
            </span>
          </span>
        </label>
      </div>
    </div>
  );
};
