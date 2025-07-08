import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { GridSwitch } from './grid-switch';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta = {
  title: 'Atoms/GridSwitch',
  component: GridSwitch,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GridSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'switch-name',
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-switch',
    disabled: true,
  },
};
