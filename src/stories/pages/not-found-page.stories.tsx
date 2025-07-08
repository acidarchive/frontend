import type { Meta, StoryObj } from '@storybook/nextjs';

import NotFoundPage from '@/app/not-found';

const meta = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
