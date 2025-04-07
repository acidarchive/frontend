import type { Meta, StoryObj } from '@storybook/react';

import { pattern } from './data';
import { PatternTB303 } from './pattern-tb303';

const meta = {
  title: 'Organisms/PatternTB303',
  component: PatternTB303,
  tags: ['autodocs'],
} satisfies Meta<typeof PatternTB303>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pattern: pattern,
  },
};

export const Empty: Story = {};
