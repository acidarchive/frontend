import { type RegisterOptions } from 'react-hook-form';

type Validation = {
  name: string;
  label: string;
  type: string;
  id: string;
  placeholder: string;
  validation: RegisterOptions;
};

export const username_validation: Validation = {
  name: 'username',
  label: 'Username',
  type: 'text',
  id: 'username',
  placeholder: 'username',
  validation: {
    required: 'Username is required',
    minLength: { value: 3, message: 'Minimum 3 characters' },
    maxLength: { value: 20, message: 'Maximum 20 characters' },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Only letters, numbers, and underscores allowed',
    },
  },
};

export const email_validation: Validation = {
  name: 'email',
  label: 'Email address',
  type: 'email',
  id: 'email',
  placeholder: 'you@example.com',
  validation: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
};

export const verification_code_validation: Validation = {
  name: 'code',
  label: 'Verification Code',
  type: 'text',
  id: 'code',
  placeholder: '123456',
  validation: {
    required: 'Code is required',
    pattern: {
      value: /^[0-9]{6}$/,
      message: 'Invalid verification code',
    },
  },
};

export const password_validation: Validation = {
  name: 'password',
  label: 'Password',
  type: 'password',
  id: 'password',
  placeholder: '••••••••',
  validation: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Must be at least 8 characters',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      message: 'Use 8+ characters with upper, lower, number & symbol',
    },
  },
};

export const signin_username_validation: Validation = {
  name: 'username',
  label: 'Username',
  type: 'text',
  id: 'username',
  placeholder: 'username',
  validation: {
    required: 'Username is required',
  },
};

export const signin_password_validation: Validation = {
  name: 'password',
  label: 'Password',
  type: 'password',
  id: 'password',
  placeholder: '••••••••',
  validation: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Must be at least 8 characters',
    },
  },
};
