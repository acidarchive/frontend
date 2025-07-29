'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

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
  defaultValue,
  disabled = false,
}: WaveformSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <ToggleGroup
          type="single"
          variant="outline"
          onValueChange={onChange}
          defaultValue={value}
          disabled={disabled}
        >
          <ToggleGroupItem value={Waveform.Sawtooth} className="h-8 w-12">
            <Sawtooth />
          </ToggleGroupItem>
          <ToggleGroupItem value={Waveform.Square} className="h-8 w-10">
            <Square />
          </ToggleGroupItem>
        </ToggleGroup>
      )}
    />
  );
};
