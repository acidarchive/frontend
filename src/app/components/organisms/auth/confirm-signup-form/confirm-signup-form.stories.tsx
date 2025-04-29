import type { Meta, StoryObj } from '@storybook/react';

import { UserProvider } from '@/app/context/user-context';

import { ConfirmSignupForm } from './confirm-signup-form';

const meta = {
  title: 'Organisms/Auth/ConfirmSignupForm',
  component: ConfirmSignupForm,
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
} satisfies Meta<typeof ConfirmSignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: 'testuser',
  },
};
