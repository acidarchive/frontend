import type { Meta, StoryObj } from '@storybook/react';

import { Waveform, WaveformSelect } from './waveform-select';

const meta = {
  title: 'Atoms/WaveformSelect',
  component: WaveformSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof WaveformSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => {},
  },
};

export const Square: Story = {
  args: {
    value: Waveform.Square,
  },
};

export const Sawtooth: Story = {
  args: {
    value: Waveform.Sawtooth,
  },
};

export const Disabled: Story = {
  args: {
    value: Waveform.Square,
    disabled: true,
  },
};
