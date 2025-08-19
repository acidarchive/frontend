import { GridInput } from '@/components/atoms/grid-input';
import { GridSwitch } from '@/components/atoms/grid-switch';
import { WaveformSelect } from '@/components/atoms/waveform-select';

interface TB303SettingsProps {
  readonly?: boolean;
}

export function TB303Settings({ readonly = false }: TB303SettingsProps) {
  return (
    <div className="flex flex-row items-center border-t divide-x justify-start">
      <div className="h-full flex items-center py-2 px-4 gap-4">
        <span className="text-sm font-medium flex items-center">Waveform</span>
        <WaveformSelect name="waveform" disabled={readonly} />
      </div>
      <div className="h-full flex items-center py-2 px-4 gap-4">
        <span className="text-sm font-medium flex items-center">Triplets</span>
        <GridSwitch name="triplets" defaultValue={false} disabled={readonly} />
      </div>
      <div className="h-full flex items-center py-2 p-4 gap-4">
        <span className="text-sm font-medium flex items-center">Tempo</span>
        <GridInput
          name="tempo"
          placeholder="140"
          type="number"
          id="tempo-input"
          disabled={readonly}
        />
      </div>
    </div>
  );
}
