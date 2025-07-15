import { TB303StepTime } from '@/api/generated/model';

interface TimeDisplayProps {
  time?: TB303StepTime;
}

const options: Record<string, string> = {
  note: '●',
  tied: '○',
  rest: '▬',
  '': '',
};

export function TimeDisplay({ time }: TimeDisplayProps) {
  return <span className="text-sm">{time ? options[time] : ''}</span>;
}
