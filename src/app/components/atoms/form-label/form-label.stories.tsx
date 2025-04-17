import type { Meta, StoryObj } from '@storybook/react';

import { FormLabel } from './form-label';

const meta = {
  title: 'Atoms/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username',
  },
};
