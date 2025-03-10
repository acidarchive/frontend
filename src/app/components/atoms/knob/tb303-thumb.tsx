import { mapFrom01Linear } from '@dsp-ts/math';

import styles from './tb303-thumb.module.scss';

interface TB303ThumbProps {
  value01: number;
}

import { generateMarkerPositions } from './utils';

const TOTAL_MARKERS = 12;
const SKIPPED_INDEX = 6;
const OUTER_RADIUS = 38;
const INNER_RADIUS = 25;
const MARKER_LENGTH = 8;

export function TB303Thumb({ value01 }: TB303ThumbProps) {
  const angleMin = -150;
  const angleMax = 150;
  const angle = mapFrom01Linear(value01, angleMin, angleMax);

  const markerPositions = generateMarkerPositions(
    TOTAL_MARKERS,
    SKIPPED_INDEX,
    OUTER_RADIUS,
    MARKER_LENGTH,
  );

  return (
    <div>
      <svg viewBox="0 0 100 100" className={styles.svg}>
        <circle
          cx="50"
          cy="50"
          r={OUTER_RADIUS}
          className={styles.outerCircle}
        />
        <circle
          cx="50"
          cy="50"
          r={INNER_RADIUS}
          className={styles.innerCircle}
        />

        {markerPositions.map(({ x1, y1, x2, y2 }, index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={styles.marker}
          />
        ))}
      </svg>
      <div
        className={styles.rotation}
        style={{
          rotate: `${angle}deg`,
        }}
      >
        <div className={styles.indicator} />
      </div>
    </div>
  );
}
