import type { Meta, StoryObj } from '@storybook/react';

import { GridTextarea } from './grid-textarea';

const meta = {
  title: 'Atoms/GridTextarea',
  component: GridTextarea,
  tags: ['autodocs'],
} satisfies Meta<typeof GridTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text',
    value: 'Hello world',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Hello world',
    disabled: true,
  },
};
