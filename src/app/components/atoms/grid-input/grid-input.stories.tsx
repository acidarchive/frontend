import type { Meta, StoryObj } from '@storybook/react';

import { GridInput } from './grid-input';

const meta = {
  title: 'Atoms/GridInput',
  component: GridInput,
  tags: ['autodocs'],
} satisfies Meta<typeof GridInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'Hello, world!',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Hello, world!',
    disabled: true,
  },
};
