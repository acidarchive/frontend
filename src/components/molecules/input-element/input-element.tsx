import { type RegisterOptions, useFormContext } from 'react-hook-form';

export interface InputElementProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  validation?: RegisterOptions;
  name: string;
  disabled?: boolean;
  labelAction?: React.ReactNode;
}

import { FormLabel } from '@/components/atoms/form-label';
import { Input } from '@/components/ui/input';
import { findInputError } from '@/utils/find-input-error';
import { isFormInvalid } from '@/utils/is-form-invalid';

export function InputElement({
  label,
  type,
  id,
  placeholder,
  validation,
  name,
  disabled,
  labelAction,
}: InputElementProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div>
      <div className="flex items-center justify-between">
        <FormLabel htmlFor={id}>{label}</FormLabel>
        {labelAction && <div className="text-sm">{labelAction}</div>}
      </div>
      <div className="mt-2">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, validation)}
        />
      </div>
      <div className="h-6 mt-1">
        {isInvalid && (
          <p id="email-error" className="text-sm italic text-red-600">
            {inputError?.error?.message}
          </p>
        )}
      </div>
    </div>
  );
}
