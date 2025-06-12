export interface CheckmarkDisplayProps {
  value?: boolean | null;
}

export function CheckmarkDisplay({ value }: CheckmarkDisplayProps) {
  return <span className="text-gray-900 text-sm ">{value ? '●' : ''}</span>;
}
