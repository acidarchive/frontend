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
  },
};

export const WithValue: Story = {
  args: {
    value: 'This textarea has value',
    placeholder: 'Enter your text',
  },
};

export const Disabled: Story = {
  args: {
    value: 'This textarea is disabled',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'This textarea is read-only',
    readOnly: true,
  },
};
