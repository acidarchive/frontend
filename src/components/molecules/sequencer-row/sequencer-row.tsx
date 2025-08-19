import { RowLabel } from '@/components/atoms/row-label';
import { HIGHLIGHT_STEPS, TOTAL_STEPS } from '@/enums';

import { StepCell } from './step-cell';

interface SequencerRowProps {
  label: string;
  renderCell: (index: number) => React.ReactNode;
}
export function SequencerRow({ label, renderCell }: SequencerRowProps) {
  return (
    <>
      <RowLabel label={label} />
      {Array.from({ length: TOTAL_STEPS }, (_, index) => (
        <StepCell
          key={index}
          isLast={index === TOTAL_STEPS - 1}
          isHighlighted={HIGHLIGHT_STEPS.has(index)}
        >
          {renderCell(index)}
        </StepCell>
      ))}
    </>
  );
}
