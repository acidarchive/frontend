import { TB303Step } from '@/api/generated/model';
import { RowLabel } from '@/app/components/atoms/row-label';
import { StepCell } from '@/app/components/atoms/step-cell';
import { HIGHLIGHT_STEPS, TOTAL_STEPS } from '@/app/enums';

interface SequencerRowProps {
  label: string;
  steps?: TB303Step[];
  disabled?: boolean;
  renderCell: (index: number, step: TB303Step | undefined) => React.ReactNode;
}
export function SequencerRow({ label, steps, renderCell }: SequencerRowProps) {
  return (
    <>
      <RowLabel label={label} />
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <StepCell
          key={index}
          isLast={index === TOTAL_STEPS - 1}
          isHighlighted={HIGHLIGHT_STEPS.has(index)}
        >
          {renderCell(index, steps?.[index])}
        </StepCell>
      ))}
    </>
  );
}
