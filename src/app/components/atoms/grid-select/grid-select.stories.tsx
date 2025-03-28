import type { Meta, StoryObj } from '@storybook/react';

import { GridSelect } from './grid-select';

const options = [
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
];

const meta = {
  title: 'Atoms/GridSelect',
  component: GridSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof GridSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'C',
    options,
  },
};

export const WithEmptyOption: Story = {
  args: {
    value: '',
    options,
    allowEmpty: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 'E',
    options,
    disabled: true,
  },
};
