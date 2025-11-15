import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SigninForm } from './signin-form';

const meta = {
  title: 'Organisms/Auth/SigninForm',
  component: SigninForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SigninForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
  },
};

export const WithError: Story = {
  args: {
    onSubmit: () => {},
    error: 'Incorrect username or password.',
  },
};

export const Loading: Story = {
  args: {
    onSubmit: () => {},
    isPending: true,
  },
};
