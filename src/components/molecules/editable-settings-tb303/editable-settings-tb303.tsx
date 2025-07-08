import { GridInput } from '@/components/atoms/grid-input';
import { GridSwitch } from '@/components/atoms/grid-switch';
import { WaveformSelect } from '@/components/atoms/waveform-select';

export function EditableSettingsTB303() {
  return (
    <div className="flex flex-row  items-center border-t border-gray-200 divide-x justify-start  divide-gray-200">
      <div className="h-full flex items-center py-2 px-4 gap-4">
        <span className="text-sm font-semibold text-gray-900 flex items-center">
          Waveform:
        </span>
        <WaveformSelect name="waveform" />
      </div>
      <div className="h-full flex items-center py-2 px-4 gap-4">
        <span className="text-sm font-semibold text-gray-900 flex items-center">
          Triplets:
        </span>
        <GridSwitch name="triplets" defaultValue={false} />
      </div>
      <div className="h-full flex items-center py-2 p-4 gap-4">
        <span className="text-sm font-semibold text-gray-900 flex items-center">
          Tempo:
        </span>
        <GridInput
          name="tempo"
          placeholder="140"
          type="number"
          id="tempo-input"
        />
      </div>
    </div>
  );
}
