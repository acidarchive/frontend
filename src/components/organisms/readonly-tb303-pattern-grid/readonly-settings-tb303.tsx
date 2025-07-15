import {
  TB303PatternTempo,
  TB303PatternTriplets,
  TB303PatternWaveform,
} from '@/api/generated/model';

interface ReadonlySettingsTB303Props {
  waveform?: TB303PatternWaveform;
  triplets?: TB303PatternTriplets;
  tempo?: TB303PatternTempo;
}
export function ReadonlySettingsTB303({
  waveform,
  triplets = false,
  tempo,
}: ReadonlySettingsTB303Props) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch justify-between border-t divide-y sm:divide-y-0 sm:divide-x">
      <div className="flex flex-row items-center py-2 px-4 gap-4 flex-1">
        <span className="text-sm font-semibold flex items-center">
          Waveform:
        </span>
        <span className="text-sm">{waveform}</span>
        <span className="text-sm font-semibold flex items-center ml-6">
          Triplets:
        </span>
        <span className="text-sm">{triplets ? 'On' : 'Off'}</span>
      </div>
      <div className="flex flex-row items-center py-2 px-4 gap-4 flex-1">
        <span className="text-sm font-semibold flex items-center">Tempo:</span>
        <span className="text-sm">{tempo}</span>
      </div>
    </div>
  );
}
