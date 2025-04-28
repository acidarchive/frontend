import type { Meta, StoryObj } from '@storybook/react';

import { UserProvider } from '@/app/context/user-context';

import { UserMenu } from './user-menu';

const meta: Meta<typeof UserMenu> = {
  title: 'Molecules/UserMenu',
  component: UserMenu,
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
type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {
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
