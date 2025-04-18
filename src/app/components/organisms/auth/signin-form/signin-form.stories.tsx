import type { Meta, StoryObj } from '@storybook/react';

import { SigninForm } from './signin-form';

const meta = {
  title: 'Organisms/Auth/SigninForm',
  component: SigninForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SigninForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
