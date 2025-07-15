import { StepNumber } from '@/components/atoms/step-number';
import { HIGHLIGHT_STEPS, TOTAL_STEPS } from '@/enums';

export function StepNumberRow() {
  return (
    <>
      <div className="col-span-1 sm:col-span-2 border-b border-r" />
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <StepNumber
          key={index}
          number={index + 1}
          isHighlighted={HIGHLIGHT_STEPS.has(index)}
          isLast={index === TOTAL_STEPS - 1}
        />
      ))}
    </>
  );
}
