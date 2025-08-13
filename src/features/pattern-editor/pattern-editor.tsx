'use client';

import { FormProvider } from 'react-hook-form';

import { TB303Pattern } from '@/api/generated/model';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';

import { usePatternTB303Form } from './use-pattern-tb303-form';

export interface PatternEditorProps {
  pattern?: TB303Pattern;
}

export function PatternEditor({ pattern }: PatternEditorProps) {
  const { methods, onSubmit, isSubmitting, submissionError } =
    usePatternTB303Form({ pattern });

  return (
    <FormProvider {...methods}>
      <PatternTB303Form
        error={submissionError}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </FormProvider>
  );
}
