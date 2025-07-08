import { KnobElement } from '@/components/molecules/knob-element';

export function EditableControlsTB303() {
  const knobs = [
    { label: 'tuning', name: 'tuning' },
    { label: 'cut off freq', name: 'cut_off_freq' },
    { label: 'resonance', name: 'resonance' },
    { label: 'env mod', name: 'env_mod' },
    { label: 'decay', name: 'decay' },
    { label: 'accent', name: 'accent' },
  ];

  return (
    <div className="border-t border-gray-950 flex flex-col items-center justify-center">
      <div className="flex flex-row w-full justify-between gap-2 sm:gap-6 px-1 py-2 sm:px-8">
        {knobs.map(({ name, label }) => (
          <KnobElement key={label} name={name} label={label} />
        ))}
      </div>
    </div>
  );
}
