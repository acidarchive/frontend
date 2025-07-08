import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { GridSelect } from './grid-select';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const options = [
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
];

const meta = {
  title: 'Atoms/GridSelect',
  component: GridSelect,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GridSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'grid-select-default',
    name: 'grid-select-default',
    options,
  },
};

export const WithEmptyOption: Story = {
  args: {
    options,
    allowEmpty: true,
    id: 'grid-select-empty',
    name: 'grid-select-empty',
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    id: 'grid-select-disabled',
    name: 'grid-select-disabled',
  },
};
