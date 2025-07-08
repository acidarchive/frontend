import type { Meta, StoryObj } from '@storybook/nextjs';

import { ReadonlySequencerTB303 } from './readonly-sequencer-tb303';

const meta = {
  title: 'Molecules/ReadonlySequencerTB303',
  component: ReadonlySequencerTB303,
  tags: ['autodocs'],
} satisfies Meta<typeof ReadonlySequencerTB303>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [],
  },
};
