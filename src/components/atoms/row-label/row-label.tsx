export interface RowLabelProps {
  label: string;
}

export function RowLabel({ label }: RowLabelProps) {
  return (
    <div className="col-span-1 sm:col-span-2 py-2 px-4 border-b border-r flex items-center justify-start font-medium text-sm">
      {label}
    </div>
  );
}
