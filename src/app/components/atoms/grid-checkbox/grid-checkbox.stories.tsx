import type { Meta, StoryObj } from '@storybook/react';

import { GridCheckbox } from './grid-checkbox';

const meta = {
  title: 'Atoms/GridCheckbox',
  component: GridCheckbox,
  tags: ['autodocs'],
} satisfies Meta<typeof GridCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};
