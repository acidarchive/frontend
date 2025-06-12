import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { GridInput } from './grid-input';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta = {
  title: 'Atoms/GridInput',
  component: GridInput,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GridInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    id: 'input-id',
    placeholder: 'Enter text here',
    name: 'input-name',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    id: 'number-input',
    placeholder: 'Enter a number',
    name: 'number-input',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    id: 'disabled-input',
    placeholder: 'This input is disabled',
    name: 'disabled-input',
    disabled: true,
  },
};
