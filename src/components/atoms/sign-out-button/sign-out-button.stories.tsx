import type { Meta, StoryObj } from '@storybook/nextjs';

import { UserProvider } from '@/context/user-context';

import { SignOutButton } from './sign-out-button';

const meta: Meta<typeof SignOutButton> = {
  title: 'Molecules/SignOutButton',
  component: SignOutButton,
  decorators: [
    Story => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignOutButton>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: '/dashboard',
      },
    },
  },
  args: {
    children: 'Sign Out',
  },
};
