import { clsx } from 'clsx';

interface StepCellProps {
  isHighlighted?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
}

export function StepCell({ isLast, isHighlighted, children }: StepCellProps) {
  return (
    <div
      className={clsx(
        'border-b border-r border-gray-200 sm:aspect-square flex items-center justify-center',
        isHighlighted && 'bg-gray-50',
        isLast && 'sm:border-r-0',
      )}
    >
      {children}
    </div>
  );
}
