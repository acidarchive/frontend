import { KnobElement } from '@/components/molecules/knob-element';

interface TB303ControlsProps {
  readonly?: boolean;
}

export function TB303Controls({ readonly = false }: TB303ControlsProps) {
  const knobs = [
    { label: 'tuning', name: 'tuning' },
    { label: 'cut off freq', name: 'cut_off_freq' },
    { label: 'resonance', name: 'resonance' },
    { label: 'env mod', name: 'env_mod' },
    { label: 'decay', name: 'decay' },
    { label: 'accent', name: 'accent' },
  ];

  return (
    <div className="border-t flex flex-col items-center justify-center">
      <div className="flex flex-row w-full justify-between gap-2 sm:gap-6 px-1 py-2 sm:px-8">
        {knobs.map(({ name, label }) => (
          <KnobElement
            key={label}
            name={name}
            label={label}
            disabled={readonly}
          />
        ))}
      </div>
    </div>
  );
}
