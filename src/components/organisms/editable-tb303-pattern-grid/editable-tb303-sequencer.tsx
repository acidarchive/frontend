import { CyclableInput } from '@/components/atoms/cyclable-input';
import { GridCheckbox } from '@/components/atoms/grid-checkbox';
import { SequencerRow } from '@/components/molecules/sequencer-row';
import { StepNumberRow } from '@/components/molecules/step-number-row';
import { NOTE_OPTIONS, TIME_OPTIONS, TRANSPOSE_OPTIONS } from '@/enums';

export function EditableTB303Sequencer() {
  return (
    <div className="grid sm:grid-cols-[1fr_repeat(17,_1fr)] sm:grid-rows-5 sm:grid-flow-row grid-cols-6 grid-rows-17 grid-flow-col">
      <StepNumberRow />
      <SequencerRow
        label="note"
        renderCell={(index, step) => {
          return (
            <CyclableInput
              name={`steps.${index}.note`}
              id={`note-select-${index}`}
              options={NOTE_OPTIONS}
              defaultValue={step?.note ?? ''}
              clearable
            />
          );
        }}
      />
      <SequencerRow
        label="octave"
        renderCell={(index, step) => (
          <CyclableInput
            name={`steps.${index}.transpose`}
            id={`transpose-select-${index}`}
            options={TRANSPOSE_OPTIONS}
            defaultValue={step?.transpose ?? ''}
            clearable
          />
        )}
      />
      <SequencerRow
        label="accent"
        renderCell={(index, step) => (
          <GridCheckbox
            name={`steps.${index}.accent`}
            id={`accent-checkbox-${index}`}
            checked={step?.accent ?? false}
          />
        )}
      />
      <SequencerRow
        label="slide"
        renderCell={(index, step) => (
          <GridCheckbox
            name={`steps.${index}.slide`}
            id={`slide-checkbox-${index}`}
            checked={step?.slide ?? false}
          />
        )}
      />
      <SequencerRow
        label="time"
        renderCell={(index, step) => (
          <CyclableInput
            name={`steps.${index}.time`}
            id={`time-select-${index}`}
            options={TIME_OPTIONS}
            defaultValue={step?.time ?? ''}
            clearable
          />
        )}
      />
    </div>
  );
}
