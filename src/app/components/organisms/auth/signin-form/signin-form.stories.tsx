import type { Meta, StoryObj } from '@storybook/nextjs';

import { UserProvider } from '@/context/user-context';

import { SigninForm } from './signin-form';

const meta = {
  title: 'Organisms/Auth/SigninForm',
  component: SigninForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    Story => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SigninForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
