import type { Meta, StoryObj } from '@storybook/nextjs';

import { UserProvider } from '@/context/user-context';

import { UserAvatarProfile } from './user-avatar-profile';

const meta: Meta<typeof UserAvatarProfile> = {
  title: 'Molecules/UserAvatarProfile',
  component: UserAvatarProfile,
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
type Story = StoryObj<typeof UserAvatarProfile>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: '/dashboard/tb303',
      },
    },
  },
  args: {
    user: {
      username: 'testuser',
      email: 'test@email.com',
      name: 'Test User',
      image: 'https://placehold.co/100',
      isAdmin: false,
    },
  },
};

export const WithInfo: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: '/dashboard/tr606',
      },
    },
  },
  args: {
    user: {
      username: 'testuser',
      email: 'test@email.com',
      name: 'Test User',
      image: 'https://placehold.co/100',
      isAdmin: false,
    },
    showInfo: true,
  },
};
