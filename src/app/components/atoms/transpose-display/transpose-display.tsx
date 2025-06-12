import { TB303StepTranspose } from '@/api/generated/model';

interface TransposeDisplayProps {
  transpose?: TB303StepTranspose;
}

const options: Record<string, string> = {
  up: '▲',
  down: '▼',
  '': '',
};

export function TransposeDisplay({ transpose }: TransposeDisplayProps) {
  return (
    <span className="text-gray-900 text-sm">
      {transpose ? options[transpose] : ''}
    </span>
  );
}
