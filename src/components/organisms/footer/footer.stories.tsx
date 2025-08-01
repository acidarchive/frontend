import type { Meta, StoryObj } from '@storybook/nextjs';

import { Footer } from './footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
