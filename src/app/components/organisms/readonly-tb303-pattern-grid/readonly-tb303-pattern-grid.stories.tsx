import type { Meta, StoryObj } from '@storybook/nextjs';

import { ReadonlyTB303PatternGrid } from './readonly-tb303-pattern-grid';

const meta = {
  title: 'Organisms/ReadonlyTB303PatternGrid',
  component: ReadonlyTB303PatternGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof ReadonlyTB303PatternGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pattern: {
      name: 'Pattern 1',
      title: 'Pattern 1',
      author: 'John Doe',
      steps: [
        {
          id: '1',
          number: 1,
          note: 'C#',
          transpose: 'up',
          accent: false,
          slide: false,
          time: 'note',
        },
      ],
    },
  },
};
