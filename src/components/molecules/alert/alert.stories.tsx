import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Alert } from './alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Success',
    children: 'Action completed successfully',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Error',
    children: 'Something went wrong',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'destructive',
    children: 'Something went wrong',
  },
};
