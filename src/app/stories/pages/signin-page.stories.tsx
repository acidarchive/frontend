import type { Meta, StoryObj } from '@storybook/react';

import SigninPage from '@/app/auth/signin/page';
import { UserProvider } from '@/app/context/user-context';

const meta = {
  title: 'Pages/Auth/SigninPage',
  component: SigninPage,
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
} satisfies Meta<typeof SigninPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
