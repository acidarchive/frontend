export interface CheckmarkDisplayProps {
  value?: boolean | null;
}

export function CheckmarkDisplay({ value }: CheckmarkDisplayProps) {
  return <span className="text-sm ">{value ? '●' : ''}</span>;
}
