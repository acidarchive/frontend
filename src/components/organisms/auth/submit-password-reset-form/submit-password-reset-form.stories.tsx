import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SubmitPasswordResetForm } from './submit-password-reset-form';

const meta = {
  title: 'Organisms/Auth/SubmitPasswordResetForm',
  component: SubmitPasswordResetForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SubmitPasswordResetForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resetAction: () => {},
    defaultValues: {
      email: '',
    },
  },
};

export const WithFormError: Story = {
  args: {
    resetAction: () => {},
    defaultValues: {
      email: '',
    },
    formError: 'Something went wrong',
  },
};

export const WithFieldErrors: Story = {
  args: {
    resetAction: () => {},
    defaultValues: {
      email: '',
    },
    fieldErrors: {
      email: ['Email is invalid.'],
    },
  },
};

export const Loading: Story = {
  args: {
    resetAction: () => {},
    defaultValues: {
      email: '',
    },
    isPending: true,
  },
};
