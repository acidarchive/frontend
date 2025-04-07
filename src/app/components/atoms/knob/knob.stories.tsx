import type { Meta, StoryObj } from '@storybook/react';

import { Knob } from './knob';

const meta = {
  title: 'Atoms/Knob',
  component: Knob,
  tags: ['autodocs'],
} satisfies Meta<typeof Knob>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Resonance',
    value: 50,
  },
};
