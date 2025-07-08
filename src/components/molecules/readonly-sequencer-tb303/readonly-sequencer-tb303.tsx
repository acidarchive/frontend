import { TB303Step } from '@/api/generated/model';
import { CheckmarkDisplay } from '@/components/atoms/checkmark-display';
import { NoteDisplay } from '@/components/atoms/note-display';
import { TimeDisplay } from '@/components/atoms/time-display';
import { TransposeDisplay } from '@/components/atoms/transpose-display';
import { SequencerRow } from '@/components/molecules/sequencer-row';
import { StepNumberRow } from '@/components/molecules/step-number-row';

interface ReadonlySequencerTB303GridProps {
  steps?: TB303Step[];
}

export function ReadonlySequencerTB303({
  steps,
}: ReadonlySequencerTB303GridProps) {
  return (
    <div className="grid sm:grid-cols-[1fr_repeat(17,_1fr)] sm:grid-rows-5 sm:grid-flow-row grid-cols-6 grid-rows-17 grid-flow-col">
      <StepNumberRow />

      <SequencerRow
        steps={steps}
        label="note"
        renderCell={(index, step) => {
          return <NoteDisplay note={step?.note} />;
        }}
      />
      <SequencerRow
        steps={steps}
        label="octave"
        renderCell={(index, step) => {
          return <TransposeDisplay transpose={step?.transpose} />;
        }}
      />
      <SequencerRow
        steps={steps}
        label="accent"
        renderCell={(index, step) => {
          return <CheckmarkDisplay value={step?.accent} />;
        }}
      />
      <SequencerRow
        steps={steps}
        label="slide"
        renderCell={(index, step) => {
          return <CheckmarkDisplay value={step?.slide} />;
        }}
      />
      <SequencerRow
        steps={steps}
        label="time"
        renderCell={(index, step) => {
          return <TimeDisplay time={step?.time} />;
        }}
      />
    </div>
  );
}
