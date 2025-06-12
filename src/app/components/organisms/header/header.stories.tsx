import type { Meta, StoryObj } from '@storybook/nextjs';

import { UserProvider } from '@/app/context/user-context';

import { Header } from './header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  decorators: [
    Story => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
