import type { Meta, StoryObj } from '@storybook/nextjs';

import { StepNumberRow } from './step-number-row';

const meta = {
  title: 'Molecules/StepNumberRow',
  component: StepNumberRow,
  tags: ['autodocs'],
} satisfies Meta<typeof StepNumberRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
