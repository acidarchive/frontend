'use client';
import clsx from 'clsx';

import { GridCheckbox } from '@/app/components/atoms/grid-checkbox';
import { GridInput } from '@/app/components/atoms/grid-input';
import { GridSelect } from '@/app/components/atoms/grid-select';
import { GridTextarea } from '@/app/components/atoms/grid-textarea';
import { Knob } from '@/app/components/atoms/knob';
import {
  Waveform,
  WaveformSelect,
} from '@/app/components/atoms/waveform-select';

import {
  HIGHLIGHT_STEPS,
  NOTE_OPTIONS,
  OCTAVE_OPTIONS,
  PatternTB303Type,
  TIME_OPTIONS,
  TOTAL_STEPS,
} from './types';

function RowLabel({ label }: { label: string }) {
  return (
    <div
      className={clsx(
        'col-span-1 sm:col-span-2',
        'border-b border-r border-gray-200',
        'flex items-center justify-center',
        'font-medium text-sm text-gray-900',
      )}
    >
      {label}
    </div>
  );
}

export interface PatternTB303Props {
  pattern?: PatternTB303Type;
}

export const PatternTB303 = ({ pattern }: PatternTB303Props) => {
  return (
    <div className="grid sm:grid-rows-[auto_2fr_1.5fr_0.5fr] grid-rows-[auto] border-2 border-gray-200">
      <dl className="divide-y divide-gray-200 border-b-2 border-gray-200">
        <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6">
          <dt className="text-md font-semibold text-gray-500">Title:</dt>
          <dd className="mt-1 sm:col-span-2 sm:mt-0">
            <GridInput disabled value={pattern?.title} />
          </dd>
        </div>
        <div className="px-2 py-2 sm:grid sm:grid-cols-8 sm:gap-2 sm:px-6">
          <dt className="text-md font-semibold text-gray-500">Author:</dt>
          <dd className="mt-1  sm:col-span-2 sm:mt-0">
            <GridInput disabled value={pattern?.author} />
          </dd>
        </div>
      </dl>
      <div
        className={clsx(
          'grid',
          'sm:grid-cols-[1fr_repeat(17,_1fr)] sm:grid-rows-5 sm:grid-flow-row',
          'grid-cols-6 grid-rows-17 grid-flow-col',
        )}
      >
        <div
          className={clsx(
            'col-span-1 sm:col-span-2',
            'border-b border-r border-gray-200',
          )}
        ></div>
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              'border-b border-r border-gray-200',
              'flex items-center justify-center sm:aspect-square',
              HIGHLIGHT_STEPS.has(index) && 'bg-gray-50',
              index === TOTAL_STEPS - 1 && 'border-r-0',
            )}
          >
            <span className="text-sm text-gray-900 font-medium">
              {index + 1}
            </span>
          </div>
        ))}

        <RowLabel label="note" />
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              'border-b border-r border-gray-200',
              'sm:aspect-square',
              HIGHLIGHT_STEPS.has(index) && 'bg-gray-50',
              index === TOTAL_STEPS - 1 && 'border-r-0',
            )}
          >
            <GridSelect
              key={index}
              allowEmpty
              disabled
              options={NOTE_OPTIONS}
              value={pattern?.steps[index]?.note}
            />
          </div>
        ))}
        <RowLabel label="octave" />
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              'border-b border-r border-gray-200 sm:aspect-square',
              HIGHLIGHT_STEPS.has(index) && 'bg-gray-50',
              index === TOTAL_STEPS - 1 && 'border-r-0',
            )}
          >
            <GridSelect
              key={index}
              allowEmpty
              disabled
              options={OCTAVE_OPTIONS}
              value={pattern?.steps[index]?.octave}
            />
          </div>
        ))}
        <RowLabel label="accent" />
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              'border-b border-r border-gray-200 sm:aspect-square',
              HIGHLIGHT_STEPS.has(index) && 'bg-gray-50',
              index === TOTAL_STEPS - 1 && 'border-r-0',
            )}
          >
            <GridCheckbox disabled checked={pattern?.steps[index]?.accent} />
          </div>
        ))}

        <RowLabel label="slide" />
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              'border-b border-r border-gray-200 sm:aspect-square',
              HIGHLIGHT_STEPS.has(index) && 'bg-gray-50',
              index === TOTAL_STEPS - 1 && 'border-r-0',
            )}
          >
            <GridCheckbox disabled checked={pattern?.steps[index]?.slide} />
          </div>
        ))}
        <RowLabel label="time" />
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              'border-b border-r border-gray-200 sm:aspect-square',
              HIGHLIGHT_STEPS.has(index) && 'bg-gray-50',
              index === TOTAL_STEPS - 1 && 'border-r-0',
            )}
          >
            <GridSelect
              key={index}
              options={TIME_OPTIONS}
              allowEmpty
              disabled
              value={pattern?.steps[index]?.time}
            />
          </div>
        ))}
      </div>
      <div>
        <GridTextarea disabled value={pattern?.description} />
      </div>
      <div className="grid grid-cols-[1fr_4fr] border-t-2 border-gray-200">
        <div className="border-r-2 border-gray-200">
          <WaveformSelect disabled value={Waveform.Sawtooth} />
        </div>

        <div className="flex flex-row w-full justify-between gap-[6%] px-[3%]">
          <Knob label="cut off freq" disabled />
          <Knob label="resonance" disabled />
          <Knob label="env mod" disabled />
          <Knob label="decay" disabled />
          <Knob label="accent" disabled />
        </div>
      </div>
    </div>
  );
};
