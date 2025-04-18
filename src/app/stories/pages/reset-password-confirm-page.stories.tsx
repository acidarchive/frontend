import type { Meta, StoryObj } from '@storybook/react';

import ConfirmPasswordResetPage from '@/app/auth/reset-password/confirm/page';

const meta = {
  title: 'Pages/Auth/ConfirmPasswordResetPage',
  component: ConfirmPasswordResetPage,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmPasswordResetPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
