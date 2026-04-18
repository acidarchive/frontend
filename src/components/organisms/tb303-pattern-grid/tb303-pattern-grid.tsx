'use client';

import { TB303BarTabs } from './tb303-bar-tabs';
import { TB303Controls } from './tb303-controls';
import { TB303Notes } from './tb303-notes';
import { TB303Sequencer } from './tb303-sequencer';
import { TB303Settings } from './tb303-settings';
import { usePatternBars } from './use-pattern-bars';

export interface TB303PatternGridProps {
  readonly?: boolean;
}

export function TB303PatternGrid({ readonly = false }: TB303PatternGridProps) {
  const { fields, activeBar, setActiveBar, handleAddBar, handleRemoveBar } =
    usePatternBars();

  return (
    <div className="grid sm:grid-rows-[6fr_5fr_auto] grid-rows-[auto] border relative">
      <div>
        {(!readonly || fields.length > 1) ? (
          <TB303BarTabs
            barCount={fields.length}
            activeIndex={activeBar}
            readonly={readonly}
            onSelect={setActiveBar}
            onAdd={handleAddBar}
            onRemove={handleRemoveBar}
          />
        ) : null}
        <TB303Sequencer
          key={fields[activeBar]?.id ?? activeBar}
          barIndex={activeBar}
          readonly={readonly}
        />
      </div>
      <TB303Notes readonly={readonly} />
      <TB303Settings readonly={readonly} />
      <TB303Controls readonly={readonly} />
    </div>
  );
}
