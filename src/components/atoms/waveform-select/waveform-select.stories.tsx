import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { Waveform, WaveformSelect } from './waveform-select';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta = {
  title: 'Atoms/WaveformSelect',
  component: WaveformSelect,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof WaveformSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'waveform',
    defaultValue: Waveform.Sawtooth,
  },
};

export const Disabled: Story = {
  args: {
    name: 'waveform',
    disabled: true,
  },
};
