import { mapFrom01Linear } from '@dsp-ts/math';

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
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <circle
          cx="50"
          cy="50"
          r={OUTER_RADIUS}
          className="fill-transparent stroke-black dark:stroke-foreground stroke-[3]"
        />
        <circle
          cx="50"
          cy="50"
          r={INNER_RADIUS}
          className="fill-accent dark:fill-transparent stroke-black dark:stroke-foreground stroke-[2]"
        />

        {markerPositions.map(({ x1, y1, x2, y2 }, index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="stroke-black dark:stroke-foreground stroke-[3]"
          />
        ))}
      </svg>
      <div
        className="absolute w-full h-full"
        style={{
          rotate: `${angle}deg`,
        }}
      >
        <div className="absolute left-1/2 top-0 h-[46%] w-[3%] mt-[4%] -translate-x-1/2 rounded bg-black dark:bg-foreground" />
      </div>
    </div>
  );
}
