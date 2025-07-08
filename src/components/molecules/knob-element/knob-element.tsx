'use client';
import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { Knob, type KnobProps } from '@/components/atoms/knob';

export type KnobElementProps = Omit<KnobProps, 'value' | 'onChange'> & {
  readonly defaultValue?: number;
  readonly name: string;
  readonly validation?: RegisterOptions;
};

export function KnobElement({
  name,
  defaultValue = 50,
  validation,
  ...knobProps
}: KnobElementProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={validation}
      render={({ field }) => (
        <Knob {...knobProps} value={field.value} onChange={field.onChange} />
      )}
    />
  );
}
