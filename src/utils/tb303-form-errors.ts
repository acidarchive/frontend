import { type FieldErrors } from 'react-hook-form';

export function extractTB303StepValidationError(
  errors: FieldErrors<{ steps?: unknown }>,
): string | undefined {
  let errorToShow = errors.steps?.root?.message;

  if (!errorToShow && Array.isArray(errors.steps)) {
    const firstStepError = errors.steps.find(step => step?.time?.message);
    if (firstStepError?.time?.message) {
      errorToShow = firstStepError.time.message;
    }
  }

  return errorToShow || undefined;
}
