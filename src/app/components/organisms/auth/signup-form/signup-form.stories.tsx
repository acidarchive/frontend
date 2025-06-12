import type { Meta, StoryObj } from '@storybook/nextjs';

import { SignupForm } from './signup-form';

const meta = {
  title: 'Organisms/Auth/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
