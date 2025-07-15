import { mapFrom01Linear, mapTo01Linear } from '@dsp-ts/math';
import { clsx } from 'clsx';
import { useId } from 'react';
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
  readonly onChange?: (value: number) => void;
  readonly id?: string;
  readonly 'aria-labelledby'?: string;
};

export function Knob({
  label,
  disabled = false,
  value = 50,
  onChange,
  mapTo01 = mapTo01Linear,
  mapFrom01 = mapFrom01Linear,
  id,
  'aria-labelledby': ariaLabelledBy,
}: KnobProps) {
  const knobId = useId();
  const labelId = useId();

  const finalKnobId = id || knobId;
  const finalLabelId = ariaLabelledBy || labelId;

  const value01 = mapTo01(value, VALUE_MIN, VALUE_MAX);

  const handleValueChange = (newValue: number) => {
    onChange?.(Math.round(newValue));
  };

  const keyboardControlHandlers = useKnobKeyboardControls({
    valueRaw: value,
    valueMin: VALUE_MIN,
    valueMax: VALUE_MAX,
    step: 1,
    stepLarger: 10,
    onValueRawChange: handleValueChange,
  });

  return (
    <div
      className={clsx(
        'relative w-full h-auto outline-none cursor-pointer m-[1%] mb-0',
        { 'pointer-events-none': disabled },
      )}
    >
      {label && (
        <KnobHeadlessLabel
          className="absolute left-1/2 transform -translate-x-1/2 text-center uppercase text-[0.6rem] font-semibold whitespace-nowrap -translate-y-[30%]"
          id={finalLabelId}
        >
          {label}
        </KnobHeadlessLabel>
      )}
      <div className="p-[2%] pt-[12%]">
        <KnobHeadless
          id={finalKnobId}
          aria-labelledby={finalLabelId}
          className="relative w-full h-auto outline-none cursor-pointer aspect-square"
          valueMin={VALUE_MIN}
          valueMax={VALUE_MAX}
          valueRaw={value}
          valueRawRoundFn={valueRawRoundFunction}
          valueRawDisplayFn={valueRawDisplayFunction}
          dragSensitivity={DRAG_SENSITIVITY}
          mapTo01={mapTo01}
          mapFrom01={mapFrom01}
          onValueRawChange={handleValueChange}
          {...keyboardControlHandlers}
        >
          <TB303Thumb value01={value01} />
        </KnobHeadless>
      </div>
    </div>
  );
}
