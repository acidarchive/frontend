import type { Meta, StoryObj } from '@storybook/nextjs';

import { Loader } from './loader';

const meta = {
  title: 'Atoms/Loader',
  component: Loader,
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
