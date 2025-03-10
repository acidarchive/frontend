import { mapFrom01Linear, mapTo01Linear } from '@dsp-ts/math';
import { useId, useState } from 'react';
import {
  KnobHeadless,
  KnobHeadlessLabel,
  KnobHeadlessOutput,
  useKnobKeyboardControls,
} from 'react-knob-headless';

import styles from './knob.module.scss';
import { TB303Thumb } from './tb303-thumb';

type KnobHeadlessProps = React.ComponentProps<typeof KnobHeadless>;

const valueRawRoundFunction = (valueRaw: number) => Math.round(valueRaw);
const valueRawDisplayFunction = (valueRaw: number) =>
  `${Math.round(valueRaw)}%`;

const DRAG_SENSITIVITY = 0.006;
const VALUE_MIN = 0;
const VALUE_MAX = 100;

export type KnobProps = Pick<KnobHeadlessProps, 'mapTo01' | 'mapFrom01'> & {
  readonly label: string;
  readonly valueDefault: number;
};

export function Knob({
  label,
  valueDefault,
  mapTo01 = mapTo01Linear,
  mapFrom01 = mapFrom01Linear,
}: KnobProps) {
  const knobId = useId();
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState<number>(valueDefault);

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
    <div>
      <KnobHeadlessLabel id={labelId}>{label}</KnobHeadlessLabel>
      <KnobHeadless
        id={knobId}
        aria-labelledby={labelId}
        className={styles.knob}
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
      <KnobHeadlessOutput htmlFor={knobId}>
        {valueRawDisplayFunction(valueRaw)}
      </KnobHeadlessOutput>
    </div>
  );
}
