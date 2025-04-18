import type { Meta, StoryObj } from '@storybook/react';

import ConfirmSignupPage from '@/app/auth/confirm-signup/page';

const meta = {
  title: 'Pages/Auth/ConfirmSignupPage',
  component: ConfirmSignupPage,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmSignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
