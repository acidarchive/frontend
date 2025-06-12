import type { Meta, StoryObj } from '@storybook/nextjs';

import { ReadonlyPatternHeader } from './readonly-pattern-header';

const meta = {
  title: 'Molecules/ReadonlyPatternHeader',
  component: ReadonlyPatternHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof ReadonlyPatternHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Pattern 1',
    author: 'John Doe',
  },
};
