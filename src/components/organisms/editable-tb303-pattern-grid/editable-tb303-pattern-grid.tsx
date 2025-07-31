import { GridTextarea } from '@/components/atoms/grid-textarea';

import { EditablePatternHeader } from './editable-pattern-header';
import { EditableTB303Controls } from './editable-tb303-controls';
import { EditableTB303Sequencer } from './editable-tb303-sequencer';
import { EditableTB303Settings } from './editable-tb303-settings';

export function EditableTB303PatternGrid() {
  return (
    <div className="grid sm:grid-rows-[auto_6fr_5fr_auto] grid-rows-[auto] border relative">
      <EditablePatternHeader />
      <EditableTB303Sequencer />
      <GridTextarea name="description" />
      <EditableTB303Settings />
      <EditableTB303Controls />
    </div>
  );
}
