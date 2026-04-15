'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { FormAlert } from '@/components/molecules/form-alert';
import { SwitchElement } from '@/components/molecules/switch-element';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface PatternTB303FormProps {
  readonly?: boolean;
  error?: string;
  isSubmitting?: boolean;
  onReset?: () => void;
  onSubmit?: () => void;
}

export function PatternTB303Form({
  readonly,
  error,
  onSubmit,
  onReset,
}: PatternTB303FormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="flex flex-col gap-4 w-fit">
        {error && <FormAlert title="Error" message={error} />}
        <div className="flex items-start gap-8">
          <div className="shrink-0">
            <TB303PatternGrid readonly={readonly} />
          </div>
          <div className="flex flex-col gap-4 border p-4 w-full max-w-sm">
            <Field>
              <FieldLabel htmlFor="name">Pattern name</FieldLabel>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Pattern name is required',
                  minLength: { value: 3, message: 'Minimum 3 characters' },
                  maxLength: { value: 50, message: 'Maximum 50 characters' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="Enter pattern name"
                    disabled={readonly}
                    value={field.value ?? ''}
                    aria-invalid={!!errors.name}
                  />
                )}
              />
              <FieldError errors={[errors.name as { message?: string }]} />
            </Field>
            <SwitchElement
              label="Make this pattern public"
              description="If enabled, this pattern will be visible to other users."
              name="is_public"
              disabled={readonly}
            />
            {onSubmit && (
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={onReset}>
                  Reset
                </Button>
                <Button type="submit">Save</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
