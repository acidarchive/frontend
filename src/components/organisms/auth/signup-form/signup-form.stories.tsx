import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SignupForm } from './signup-form';

const meta = {
  title: 'Organisms/Auth/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SignupForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: () => {},
  },
};

export const WithFieldErrors: Story = {
  args: {
    action: () => {},
    fieldErrors: {
      username: ['Username is required'],
      email: ['Invalid email address'],
      password: ['Password must be at least 8 characters'],
      confirmPassword: ['Passwords do not match'],
    },
  },
};

export const WithFormError: Story = {
  args: {
    action: () => {},
    formError: 'Username already exists.',
    defaultValues: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    },
  },
};

export const Loading: Story = {
  args: {
    action: () => {},
    isPending: true,
    defaultValues: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    },
  },
};
