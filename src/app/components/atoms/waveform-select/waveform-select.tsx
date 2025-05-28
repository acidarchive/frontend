import { Radio, RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

import { Sawtooth } from './sawtooth';
import { Square } from './square';

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
      className={clsx(
        'flex flex-col items-center justify-center h-full p-4 gap-6',
        disabled && 'pointer-events-none',
      )}
      disabled={disabled}
      onChange={handleChange}
    >
      <div className="uppercase text-xs font-semibold text-center text-gray-900">
        Waveform
      </div>
      <div className="flex gap-4">
        <Radio
          value={Waveform.Sawtooth}
          className={({ checked }) =>
            clsx(
              'w-full h-full hover:bg-gray-200',
              checked && 'border border-black',
            )
          }
        >
          <Sawtooth />
        </Radio>
        <Radio
          value={Waveform.Square}
          className={({ checked }) =>
            clsx(
              'w-full h-full hover:bg-gray-200',
              checked && 'border border-black',
            )
          }
        >
          <Square />
        </Radio>
      </div>
    </RadioGroup>
  );
};
