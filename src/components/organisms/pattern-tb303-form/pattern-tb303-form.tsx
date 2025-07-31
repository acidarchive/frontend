'use client';

import { FormEventHandler } from 'react';

import { ErrorAlert } from '@/components/molecules/error-alert';
import { EditableTB303PatternDetails } from '@/components/organisms/editable-tb303-pattern-details';
import { EditableTB303PatternGrid } from '@/components/organisms/editable-tb303-pattern-grid';

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

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          <EditableTB303PatternGrid />
        </div>
        <div className="lg:w-100 lg:flex-shrink-0">
          <EditableTB303PatternDetails />
        </div>
      </div>
    </form>
  );
}
