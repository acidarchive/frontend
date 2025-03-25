import type { Meta, StoryObj } from '@storybook/react';

import { StepFlag } from './step-flag';

const meta = {
  title: 'Atoms/StepFlag',
  component: StepFlag,
  tags: ['autodocs'],
} satisfies Meta<typeof StepFlag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: true,
    onChange: () => {},
  },
};

export const Unchecked: Story = {
  args: {
    value: undefined,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: true,
    onChange: () => {},
  },
};
