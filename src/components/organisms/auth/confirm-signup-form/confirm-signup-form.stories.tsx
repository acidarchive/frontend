import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ConfirmSignupForm } from './confirm-signup-form';

const meta = {
  title: 'Organisms/Auth/ConfirmSignupForm',
  component: ConfirmSignupForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmSignupForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    confirmSignUpAction: () => {},
    resendSignupCodeAction: () => {},
    defaultValues: {
      username: 'testuser',
      code: '',
    },
  },
};

export const WithFormError: Story = {
  args: {
    confirmSignUpAction: () => {},
    resendSignupCodeAction: () => {},
    defaultValues: {
      username: 'testuser',
      code: '',
    },
    formError: 'Something went wrong',
  },
};

export const WithAlertMessage: Story = {
  args: {
    confirmSignUpAction: () => {},
    resendSignupCodeAction: () => {},
    defaultValues: {
      username: 'testuser',
      code: '',
    },
    message: 'Verification code sent successfully!',
  },
};

export const WithFieldErrors: Story = {
  args: {
    confirmSignUpAction: () => {},
    resendSignupCodeAction: () => {},
    defaultValues: {
      username: 'testuser',
      code: 'a',
    },
    fieldErrors: {
      code: ['Code must be exactly 6 digits.'],
    },
  },
};

export const Loading: Story = {
  args: {
    confirmSignUpAction: () => {},
    resendSignupCodeAction: () => {},
    defaultValues: {
      username: 'testuser',
      code: '',
    },
    isPending: true,
  },
};

export const ResendLoading: Story = {
  args: {
    confirmSignUpAction: () => {},
    resendSignupCodeAction: () => {},
    defaultValues: {
      username: 'testuser',
      code: '',
    },
    isResendPending: true,
  },
};
