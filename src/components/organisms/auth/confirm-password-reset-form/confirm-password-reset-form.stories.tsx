import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ConfirmPasswordResetForm } from './confirm-password-reset-form';

const meta = {
  title: 'Organisms/Auth/ConfirmPasswordResetForm',
  component: ConfirmPasswordResetForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmPasswordResetForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: () => {},
    defaultValues: {
      email: 'demo@mail.com',
      code: '',
      password: '',
      confirmPassword: '',
    },
  },
};

export const WithFieldErrors: Story = {
  args: {
    action: () => {},
    defaultValues: {
      email: 'demo@mail.com',
      code: '',
      password: '',
      confirmPassword: '',
    },
    fieldErrors: {
      code: ['Verification code must be 6 digits.'],
      password: ['Password must be at least 8 characters long.'],
      confirmPassword: ['Passwords do not match.'],
    },
  },
};

export const WithFormError: Story = {
  args: {
    action: () => {},
    formError: 'Invalid verification code. Please try again.',
    defaultValues: {
      email: 'demo@mail.com',
      code: '123456',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    },
  },
};

export const Loading: Story = {
  args: {
    action: () => {},
    isPending: true,
    defaultValues: {
      email: 'demo@mail.com',
      code: '123456',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    },
  },
};
