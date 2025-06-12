import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button } from './button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click Me, Please',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Click Me, Please',
    variant: 'secondary',
  },
};
