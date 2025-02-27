import type { Meta, StoryObj } from '@storybook/react';

import { Version } from './version';

const meta = {
  title: 'Atoms/Version',
  component: Version,
  tags: ['autodocs'],
} satisfies Meta<typeof Version>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
