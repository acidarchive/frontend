'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import { clsx } from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import { Sawtooth } from './sawtooth';
import { Square } from './square';

export enum Waveform {
  Square = 'square',
  Sawtooth = 'sawtooth',
}

export interface WaveformSelectProps {
  name: string;
  defaultValue?: Waveform;
  disabled?: boolean;
}

export const WaveformSelect = ({
  name,
  defaultValue = Waveform.Sawtooth,
  disabled = false,
}: WaveformSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          name={name}
          value={value}
          className={clsx(
            'flex items-center justify-center',
            disabled && 'pointer-events-none',
          )}
          disabled={disabled}
          onChange={onChange}
        >
          <div className="flex gap-4">
            <Radio
              value={Waveform.Sawtooth}
              className={({ checked }) =>
                clsx(
                  'w-8 h-6 hover:bg-gray-200',
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
                  'w-8 h-6 hover:bg-gray-200',
                  checked && 'border border-black',
                )
              }
            >
              <Square />
            </Radio>
          </div>
        </RadioGroup>
      )}
    />
  );
};
