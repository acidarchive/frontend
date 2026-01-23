import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UserNavigation } from './user-navigation';

const meta: Meta<typeof UserNavigation> = {
  title: 'Molecules/UserNavigation',
  component: UserNavigation,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserNavigation>;

export const Default: Story = {};
