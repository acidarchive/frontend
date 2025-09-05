'use client';

import { FormEventHandler } from 'react';

import { ErrorAlert } from '@/components/molecules/error-alert';
import { InputElement } from '@/components/molecules/input-element';
import { SwitchElement } from '@/components/molecules/switch-element';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';
import { pattern_name_validation } from '@/utils/input-validations';

interface PatternTB303FormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  error?: string;
  isSubmitting?: boolean;
}

export function PatternTB303Form({ error, onSubmit }: PatternTB303FormProps) {
  return (
    <form onSubmit={onSubmit}>
      {error && (
        <div className="mb-4">
          <ErrorAlert title="Error" message={error} />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <InputElement {...pattern_name_validation} disabled={false} />
        <div className="lg:flex-1">
          <TB303PatternGrid />
        </div>
        <SwitchElement
          label="Make this pattern public"
          description="If enabled, this pattern will be visible to other users."
          name="is_public"
          disabled={false}
        />
      </div>
    </form>
  );
}
