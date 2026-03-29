import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FormAlert } from './form-alert';

const meta = {
  title: 'Molecules/FormAlert',
  component: FormAlert,
  tags: ['autodocs'],
} satisfies Meta<typeof FormAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Success',
    message: 'Action completed successfully',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Error',
    message: 'Something went wrong',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'destructive',
    message: 'Something went wrong',
  },
};
