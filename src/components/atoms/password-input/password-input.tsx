'use client';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <InputGroup>
      <InputGroupInput
        type={showPassword ? 'text' : 'password'}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => setShowPassword(previous => !previous)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
