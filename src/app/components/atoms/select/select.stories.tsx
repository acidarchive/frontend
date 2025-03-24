import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
];

export const Default: Story = {
  args: {
    value: 'C',
    options,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: 'E',
    options,
    onChange: () => {},
    disabled: true,
  },
};
