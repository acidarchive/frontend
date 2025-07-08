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
        'border-b border-r border-gray-200',
        'flex items-center justify-center',
        'sm:aspect-square',
        isHighlighted && 'bg-gray-50',
        isLast && 'sm:border-r-0',
      )}
    >
      <span className="text-sm text-gray-900 font-semibold">{number}</span>
    </div>
  );
}
