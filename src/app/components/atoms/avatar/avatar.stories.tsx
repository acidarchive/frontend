import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/100',
    username: 'John Doe',
  },
};
