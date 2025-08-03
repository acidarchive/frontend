import { clsx } from 'clsx';

export interface StepNumberProps {
  number: number;
  isHighlighted?: boolean;
  isLast?: boolean;
}

export function StepNumber({ number, isHighlighted, isLast }: StepNumberProps) {
  return (
    <div
      className={clsx(
        'border-b border-r',
        'flex items-center justify-center',
        isHighlighted && 'bg-accent',
        isLast && 'sm:border-r-0',
      )}
    >
      <span className="text-sm font-medium">{number}</span>
    </div>
  );
}
