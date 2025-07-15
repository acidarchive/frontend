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
        'border-b border-r sm:aspect-square flex items-center justify-center',
        isHighlighted && 'bg-accent',
        isLast && 'sm:border-r-0',
      )}
    >
      {children}
    </div>
  );
}
