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
        'border-b border-r flex items-center justify-center p-2 min-h-8',
        isHighlighted && 'bg-accent',
        isLast && 'sm:border-r-0',
      )}
    >
      {children}
    </div>
  );
}
