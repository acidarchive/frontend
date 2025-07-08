import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { SwitchElement } from './switch-element';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta: Meta<typeof SwitchElement> = {
  title: 'Molecules/SwitchElement',
  component: SwitchElement,
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
type Story = StoryObj<typeof SwitchElement>;

export const Default: Story = {
  args: {
    name: 'switch',
    label: 'Enable Feature',
    description: 'Toggle this switch to enable the feature.',
    defaultValue: false,
  },
};

export const Disabled: Story = {
  args: {
    name: 'switch-disabled',
    label: 'Disabled Switch',
    description: 'This switch is disabled.',
    disabled: true,
    defaultValue: false,
  },
};
