import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FuzzyText } from './fuzzy-text';

const meta = {
  title: 'Atoms/FuzzyText',
  component: FuzzyText,
  tags: ['autodocs'],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof FuzzyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Fuzzy Text',
  },
};
