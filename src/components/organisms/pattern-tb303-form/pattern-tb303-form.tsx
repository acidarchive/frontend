'use client';

import { FormEventHandler } from 'react';

import { ErrorAlert } from '@/components/molecules/error-alert';
import { TB303PatternDetails } from '@/components/organisms/tb303-pattern-details';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';

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
          <TB303PatternGrid />
        </div>
        <div className="lg:w-100 lg:flex-shrink-0">
          <TB303PatternDetails />
        </div>
      </div>
    </form>
  );
}
