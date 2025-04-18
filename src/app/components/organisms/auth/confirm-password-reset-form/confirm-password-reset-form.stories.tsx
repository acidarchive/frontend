import type { Meta, StoryObj } from '@storybook/react';

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
    email: 'demo@mail.com',
  },
};
