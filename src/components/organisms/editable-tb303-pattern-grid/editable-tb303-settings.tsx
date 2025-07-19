import { GridInput } from '@/components/atoms/grid-input';
import { GridSwitch } from '@/components/atoms/grid-switch';
import { WaveformSelect } from '@/components/atoms/waveform-select';

export function EditableTB303Settings() {
  return (
    <div className="flex flex-row  items-center border-t divide-x justify-start">
      <div className="h-full flex items-center py-2 px-4 gap-4">
        <span className="text-sm font-semibold flex items-center">
          Waveform:
        </span>
        <WaveformSelect name="waveform" />
      </div>
      <div className="h-full flex items-center py-2 px-4 gap-4">
        <span className="text-sm font-semibold flex items-center">
          Triplets:
        </span>
        <GridSwitch name="triplets" defaultValue={false} />
      </div>
      <div className="h-full flex items-center py-2 p-4 gap-4">
        <span className="text-sm font-semibold flex items-center">Tempo:</span>
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
