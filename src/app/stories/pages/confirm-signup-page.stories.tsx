import type { Meta, StoryObj } from '@storybook/react';

import ConfirmSignupPage from '@/app/auth/confirm-signup/page';
import { AuthLayout } from '@/app/components/layouts/auth-layout';

const meta = {
  title: 'Pages/Auth/ConfirmSignupPage',
  component: ConfirmSignupPage,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    Story => (
      <AuthLayout>
        <Story />
      </AuthLayout>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmSignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
