'use client';

import { TB303Controls } from './tb303-controls';
import { TB303Notes } from './tb303-notes';
import { TB303Sequencer } from './tb303-sequencer';
import { TB303Settings } from './tb303-settings';

export interface TB303PatternGridProps {
  readonly?: boolean;
}

export function TB303PatternGrid({ readonly = false }: TB303PatternGridProps) {
  return (
    <div className="grid sm:grid-rows-[6fr_5fr_auto] grid-rows-[auto] border relative">
      <TB303Sequencer readonly={readonly} />
      <TB303Notes readonly={readonly} />
      <TB303Settings readonly={readonly} />
      <TB303Controls readonly={readonly} />
    </div>
  );
}
