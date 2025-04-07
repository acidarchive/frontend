import { mapFrom01Linear, mapTo01Linear } from '@dsp-ts/math';
import clsx from 'clsx';
import { useId, useState } from 'react';
import {
  KnobHeadless,
  KnobHeadlessLabel,
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
    <div className={clsx(styles.container, { [styles.disabled]: disabled })}>
      <KnobHeadlessLabel className={styles.label} id={labelId}>
        {label}
      </KnobHeadlessLabel>
      <div className={styles.inner}>
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
      </div>
    </div>
  );
}
