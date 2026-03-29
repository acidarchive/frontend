'use client';

import { useState } from 'react';

import { Icons } from '@/components/atoms/icons';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

type PasswordInputProps = React.ComponentProps<typeof InputGroupInput>;

export function PasswordInput({
  disabled,
  placeholder = '••••••••',
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const VisibilityIcon = showPassword ? Icons.Eye : Icons.EyeOff;

  return (
    <InputGroup>
      <InputGroupInput
        type={!disabled && showPassword ? 'text' : 'password'}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setShowPassword(previous => !previous)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <VisibilityIcon className="size-6" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
