import type { Meta, StoryObj } from '@storybook/nextjs';

import ConfirmSignupPage from '@/app/auth/confirm-signup/page';
import { UserProvider } from '@/context/user-context';

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
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmSignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
