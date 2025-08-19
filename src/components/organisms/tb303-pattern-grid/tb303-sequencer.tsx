import { useFormContext } from 'react-hook-form';

import { CyclableInput } from '@/components/atoms/cyclable-input';
import { SequencerRow } from '@/components/molecules/sequencer-row';
import { StepNumberRow } from '@/components/molecules/step-number-row';
import {
  BOOLEAN_OPTIONS,
  NOTE_OPTIONS,
  TIME_OPTIONS,
  TRANSPOSE_OPTIONS,
} from '@/enums';

interface TB303SequencerProps {
  readonly?: boolean;
}

export function TB303Sequencer({ readonly = false }: TB303SequencerProps) {
  const { getValues } = useFormContext();
  const values = getValues();
  const steps = values.steps;
  return (
    <div className="grid sm:grid-cols-[1fr_repeat(17,_1fr)] sm:grid-rows-5 sm:grid-flow-row grid-cols-6 grid-rows-17 grid-flow-col">
      <StepNumberRow />

      <SequencerRow
        label="note"
        renderCell={index => (
          <CyclableInput
            name={`steps.${index}.note`}
            id={`note-select-${index}`}
            options={NOTE_OPTIONS}
            defaultValue={steps?.[index]?.note ?? ''}
            clearable
            disabled={readonly}
          />
        )}
      />

      <SequencerRow
        label="octave"
        renderCell={index => (
          <CyclableInput
            name={`steps.${index}.transpose`}
            id={`transpose-select-${index}`}
            options={TRANSPOSE_OPTIONS}
            defaultValue={steps?.[index]?.transpose ?? ''}
            clearable
            disabled={readonly}
          />
        )}
      />

      <SequencerRow
        label="accent"
        renderCell={index => (
          <CyclableInput
            name={`steps.${index}.accent`}
            id={`accent-checkbox-${index}`}
            options={BOOLEAN_OPTIONS}
            defaultValue={steps?.[index]?.accent ?? false}
            disabled={readonly}
          />
        )}
      />

      <SequencerRow
        label="slide"
        renderCell={index => (
          <CyclableInput
            name={`steps.${index}.slide`}
            id={`slide-checkbox-${index}`}
            options={BOOLEAN_OPTIONS}
            defaultValue={steps?.[index]?.slide ?? false}
            disabled={readonly}
          />
        )}
      />

      <SequencerRow
        label="time"
        renderCell={index => (
          <CyclableInput
            name={`steps.${index}.time`}
            id={`time-select-${index}`}
            options={TIME_OPTIONS}
            defaultValue={steps?.[index]?.time ?? ''}
            clearable
            disabled={readonly}
          />
        )}
      />
    </div>
  );
}
