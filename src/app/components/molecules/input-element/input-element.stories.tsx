import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { InputElement } from './input-element';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta: Meta<typeof InputElement> = {
  title: 'Molecules/InputElement',
  component: InputElement,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputElement>;

export const Default: Story = {
  args: {
    label: 'Username',
    type: 'text',
    id: 'username',
    placeholder: 'Enter your username',
    name: 'username',
  },
};

export const WithLabelAction: Story = {
  args: {
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    labelAction: (
      <span className="text-blue-500 hover:underline cursor-pointer">
        Forgot?
      </span>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    type: 'text',
    id: 'disabled-field',
    placeholder: 'This field is disabled',
    name: 'disabled-field',
    disabled: true,
  },
};
