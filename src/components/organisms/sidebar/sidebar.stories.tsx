import type { Meta, StoryObj } from '@storybook/nextjs';

import { SidebarProvider } from '@/components/ui/sidebar';
import { UserProvider } from '@/context/user-context';

import { Sidebar } from './sidebar';

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <UserProvider>
        <SidebarProvider>
          <Story />
        </SidebarProvider>
      </UserProvider>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
