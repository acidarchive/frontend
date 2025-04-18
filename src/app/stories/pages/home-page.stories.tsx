import type { Meta, StoryObj } from '@storybook/react';

import { UserProvider } from '@/app/context/user-context';
import HomePage from '@/app/page';

const meta = {
  title: 'Pages/HomePage',
  component: HomePage,
  decorators: [
    Story => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
