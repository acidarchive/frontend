'use client';

import {
  TB303PatternAccent,
  TB303PatternCutOffFreq,
  TB303PatternDecay,
  TB303PatternEnvMod,
  TB303PatternResonance,
  TB303PatternTuning,
} from '@/api/generated/model';
import { Knob } from '@/components/atoms/knob';

export interface ReadonlyControlsTB303Props {
  tuning?: TB303PatternTuning;
  cut_off_freq?: TB303PatternCutOffFreq;
  resonance?: TB303PatternResonance;
  env_mod?: TB303PatternEnvMod;
  decay?: TB303PatternDecay;
  accent?: TB303PatternAccent;
}

export function ReadonlyControlsTB303({
  tuning,
  cut_off_freq,
  resonance,
  env_mod,
  decay,
  accent,
}: ReadonlyControlsTB303Props) {
  return (
    <div className="border-t flex flex-col items-center justify-center">
      <div className="flex flex-row w-full justify-between gap-2 sm:gap-6 px-1 py-2 sm:px-8">
        <Knob label="tuning" value={tuning || 50} />
        <Knob label="cut off freq" value={cut_off_freq || 50} />
        <Knob label="resonance" value={resonance || 50} />
        <Knob label="env mod" value={env_mod || 50} />
        <Knob label="decay" value={decay || 50} />
        <Knob label="accent" value={accent || 50} />
      </div>
    </div>
  );
}
