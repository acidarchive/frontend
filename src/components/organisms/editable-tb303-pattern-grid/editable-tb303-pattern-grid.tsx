import { GridTextarea } from '@/components/atoms/grid-textarea';
import { EditableControlsTB303 } from '@/components/molecules/editable-controls-tb303';
import { EditablePatternHeader } from '@/components/molecules/editable-pattern-header';
import { EditableSequencerTB303 } from '@/components/molecules/editable-sequencer-tb303';
import { EditableSettingsTB303 } from '@/components/molecules/editable-settings-tb303';

export function EditableTB303PatternGrid() {
  return (
    <div className="grid sm:grid-rows-[auto_6fr_5fr_auto] grid-rows-[auto] border border-gray-950 relative">
      <EditablePatternHeader />
      <EditableSequencerTB303 />
      <GridTextarea />
      <EditableSettingsTB303 />
      <EditableControlsTB303 />
    </div>
  );
}
