import { TB303Pattern } from '@/api/generated/model';

import { ReadonlyControlsTB303 } from './readonly-controls-tb303';
import { ReadonlyPatternHeader } from './readonly-pattern-header';
import { ReadonlySequencerTB303 } from './readonly-sequencer-tb303';
import { ReadonlySettingsTB303 } from './readonly-settings-tb303';

interface ReadonlyTB303PatternGridProps {
  pattern?: TB303Pattern;
}

export function ReadonlyTB303PatternGrid({
  pattern,
}: ReadonlyTB303PatternGridProps) {
  return (
    <div className="grid sm:grid-rows-[auto_6fr_5fr_auto] grid-rows-[auto] border relative">
      <ReadonlyPatternHeader {...pattern} />
      <ReadonlySequencerTB303 {...pattern} />
      <div className="p-4 text-sm">{pattern?.description}</div>
      <ReadonlySettingsTB303 {...pattern} />
      <ReadonlyControlsTB303 {...pattern} />
    </div>
  );
}
