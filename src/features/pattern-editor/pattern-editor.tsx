'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { FormProvider } from 'react-hook-form';

import { Loader } from '@/components/atoms/loader';
import { ErrorFallback } from '@/components/molecules/error-fallback';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';

import { usePatternTB303Form } from './use-pattern-tb303-form';

interface PatternEditorFormProps {
  patternId?: string;
}

const PatternEditorForm = ({ patternId }: PatternEditorFormProps) => {
  const { methods, onSubmit, handleSubmit, isSubmitting, submissionError } =
    usePatternTB303Form({ patternId });

  return (
    <FormProvider {...methods}>
      <PatternTB303Form
        error={submissionError}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </FormProvider>
  );
};

export interface PatternEditorProps {
  patternId?: string;
}

export function PatternEditor({ patternId }: PatternEditorProps) {
  const isEditMode = Boolean(patternId);

  if (!isEditMode) {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PatternEditorForm />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[patternId]}>
      <Suspense fallback={<Loader />}>
        <PatternEditorForm patternId={patternId} />
      </Suspense>
    </ErrorBoundary>
  );
}
