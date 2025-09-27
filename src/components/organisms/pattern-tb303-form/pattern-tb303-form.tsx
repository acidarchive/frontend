'use client';

import { FormEventHandler } from 'react';

import { GridInput } from '@/components/atoms/grid-input';
import { ErrorAlert } from '@/components/molecules/error-alert';
import { SwitchElement } from '@/components/molecules/switch-element';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';
import { pattern_name_validation } from '@/utils/input-validations';

interface PatternTB303FormProps {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  readonly?: boolean;
  error?: string;
  isSubmitting?: boolean;
}

export function PatternTB303Form({
  readonly,
  error,
  onSubmit,
}: PatternTB303FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {error && (
        <div className="mb-4">
          <ErrorAlert title="Error" message={error} />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-18 items-center py-2 border">
          <span className="col-span-2 font-medium px-4 text-sm">Name</span>
          <div className="col-span-16 pr-4">
            <GridInput {...pattern_name_validation} disabled={readonly} />
          </div>
        </div>
        <div className="lg:flex-1">
          <TB303PatternGrid readonly={readonly} />
        </div>
        <SwitchElement
          label="Make this pattern public"
          description="If enabled, this pattern will be visible to other users."
          name="is_public"
          disabled={readonly}
        />
      </div>
    </form>
  );
}
