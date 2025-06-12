import { GridTextarea } from '@/app/components/atoms/grid-textarea';
import { EditableControlsTB303 } from '@/app/components/molecules/editable-controls-tb303';
import { EditablePatternHeader } from '@/app/components/molecules/editable-pattern-header';
import { EditableSequencerTB303 } from '@/app/components/molecules/editable-sequencer-tb303';
import { SettingsTB303 } from '@/app/components/molecules/settings-tb303';

export function EditableTB303PatternGrid() {
  return (
    <div className="grid sm:grid-rows-[auto_6fr_5fr_auto] grid-rows-[auto] border border-gray-950 relative">
      <EditablePatternHeader />
      <EditableSequencerTB303 />
      <GridTextarea />
      <SettingsTB303 />
      <EditableControlsTB303 />
    </div>
  );
}
