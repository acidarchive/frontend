import type { Meta, StoryObj } from '@storybook/react';

import { Smiley } from './smiley';

const meta = {
  title: 'Atoms/Smiley',
  component: Smiley,
  tags: ['autodocs'],
} satisfies Meta<typeof Smiley>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
