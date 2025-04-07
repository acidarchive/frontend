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

import styles from './pattern-tb303.module.scss';
import {
  HIGHLIGHT_STEPS,
  NOTE_OPTIONS,
  OCTAVE_OPTIONS,
  PatternTB303Type,
  TIME_OPTIONS,
  TOTAL_STEPS,
} from './types';

export interface PatternTB303Props {
  pattern?: PatternTB303Type;
}

export const PatternTB303 = ({ pattern }: PatternTB303Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.headerLabel}>Title:</div>
          <div className={styles.headerInput}>
            <GridInput disabled value={pattern?.title} />
          </div>
        </div>
        <div className={styles.headerRow}>
          <div className={styles.headerLabel}>Author:</div>
          <div className={styles.headerInput}>
            <GridInput disabled value={pattern?.author} />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={clsx(styles.labelCell, styles.label)}></div>
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              styles.cell,
              styles.label,
              HIGHLIGHT_STEPS.has(index) && styles.highlight,
            )}
          >
            <span>{index + 1}</span>
          </div>
        ))}

        <div className={clsx(styles.labelCell, styles.label)}>note</div>
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              styles.cell,
              HIGHLIGHT_STEPS.has(index) && styles.highlight,
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

        <div className={clsx(styles.labelCell, styles.label)}>octave</div>
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              styles.cell,
              HIGHLIGHT_STEPS.has(index) && styles.highlight,
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

        <div className={clsx(styles.labelCell, styles.label)}>accent</div>
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              styles.cell,
              HIGHLIGHT_STEPS.has(index) && styles.highlight,
            )}
          >
            <GridCheckbox disabled checked={pattern?.steps[index]?.accent} />
          </div>
        ))}

        <div className={clsx(styles.labelCell, styles.label)}>slide</div>
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              styles.cell,
              HIGHLIGHT_STEPS.has(index) && styles.highlight,
            )}
          >
            <GridCheckbox disabled checked={pattern?.steps[index]?.slide} />
          </div>
        ))}
        <div className={clsx(styles.labelCell, styles.label)}>time</div>
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <div
            key={index}
            className={clsx(
              styles.cell,
              HIGHLIGHT_STEPS.has(index) && styles.highlight,
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
      <div className={styles.textarea}>
        <GridTextarea disabled value={pattern?.description} />
      </div>
      <div className={styles.footer}>
        <div className={styles.waveformColumn}>
          <WaveformSelect disabled value={Waveform.Sawtooth} />
        </div>

        <div className={styles.knobs}>
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
