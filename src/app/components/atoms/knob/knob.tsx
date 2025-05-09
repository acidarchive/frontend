'use client';
import { mapFrom01Linear, mapTo01Linear } from '@dsp-ts/math';
import clsx from 'clsx';
import { useId, useState } from 'react';
import {
  KnobHeadless,
  KnobHeadlessLabel,
  useKnobKeyboardControls,
} from 'react-knob-headless';

import { TB303Thumb } from './tb303-thumb';

type KnobHeadlessProps = React.ComponentProps<typeof KnobHeadless>;

const valueRawRoundFunction = (valueRaw: number) => Math.round(valueRaw);
const valueRawDisplayFunction = (valueRaw: number) =>
  `${Math.round(valueRaw)}%`;

const DRAG_SENSITIVITY = 0.006;
const VALUE_MIN = 0;
const VALUE_MAX = 100;

export type KnobProps = Pick<KnobHeadlessProps, 'mapTo01' | 'mapFrom01'> & {
  readonly disabled?: boolean;
  readonly value?: number;
  readonly label?: string;
};

export function Knob({
  label,
  disabled = false,
  value = 50,
  mapTo01 = mapTo01Linear,
  mapFrom01 = mapFrom01Linear,
}: KnobProps) {
  const knobId = useId();
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState<number>(value);

  const value01 = mapTo01(valueRaw, VALUE_MIN, VALUE_MAX);

  const keyboardControlHandlers = useKnobKeyboardControls({
    valueRaw,
    valueMin: VALUE_MIN,
    valueMax: VALUE_MAX,
    step: 1,
    stepLarger: 10,
    onValueRawChange: setValueRaw,
  });

  return (
    <div
      className={clsx(
        'relative w-full h-auto outline-none cursor-pointer m-[1%] mb-0',
        { 'pointer-events-none': disabled },
      )}
    >
      <KnobHeadlessLabel
        className="absolute left-1/2 transform -translate-x-1/2 text-center uppercase text-[0.6rem] font-semibold whitespace-nowrap text-gray-500"
        id={labelId}
      >
        {label}
      </KnobHeadlessLabel>
      <div className="p-[2%] pt-[12%]">
        <KnobHeadless
          id={knobId}
          aria-labelledby={labelId}
          className="relative w-full h-auto outline-none cursor-pointer aspect-square"
          valueMin={VALUE_MIN}
          valueMax={VALUE_MAX}
          valueRaw={valueRaw}
          valueRawRoundFn={valueRawRoundFunction}
          valueRawDisplayFn={valueRawDisplayFunction}
          dragSensitivity={DRAG_SENSITIVITY}
          mapTo01={mapTo01}
          mapFrom01={mapFrom01}
          onValueRawChange={setValueRaw}
          {...keyboardControlHandlers}
        >
          <TB303Thumb value01={value01} />
        </KnobHeadless>
      </div>
    </div>
  );
}
