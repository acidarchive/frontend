import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ChangePasswordForm } from './change-password-form';

const meta = {
  title: 'Organisms/Auth/ChangePasswordForm',
  component: ChangePasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ChangePasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: () => {},
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  },
};

export const WithFieldErrors: Story = {
  args: {
    action: () => {},
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    fieldErrors: {
      currentPassword: ['Current password is required.'],
      newPassword: ['Password must be at least 8 characters long.'],
      confirmNewPassword: ['Passwords do not match.'],
    },
  },
};

export const WithFormError: Story = {
  args: {
    action: () => {},
    formError: 'Current password is incorrect.',
    defaultValues: {
      currentPassword: 'wrongpassword',
      newPassword: 'NewPassword123!',
      confirmNewPassword: 'NewPassword123!',
    },
  },
};

export const Loading: Story = {
  args: {
    action: () => {},
    isPending: true,
    defaultValues: {
      currentPassword: 'OldPassword123!',
      newPassword: 'NewPassword123!',
      confirmNewPassword: 'NewPassword123!',
    },
  },
};
