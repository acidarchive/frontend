export interface RowLabelProps {
  label: string;
}

export function RowLabel({ label }: RowLabelProps) {
  return (
    <div className="col-span-1 sm:col-span-2 border-b border-r border-gray-200 flex items-center justify-center font-medium text-sm text-gray-900">
      {label}
    </div>
  );
}
