import { TB303Pattern, TB303Step } from '@/api/generated/model';

export interface MidiMessage {
  data: number[];
  tick: number;
}

export const MIDI_MESSAGE_PPQN = 24;

const MIDI_ACCENT_VELOCITY = 127;
const MIDI_NORMAL_VELOCITY = 70;
const MIDI_BASE_KEY = 36;
const MIDI_DEFAULT_TEMPO = 120;

export const noteToMidi = (note: string): number => {
  switch (note) {
    case 'C': {
      return 0;
    }
    case 'C#': {
      return 1;
    }
    case 'D': {
      return 2;
    }
    case 'D#': {
      return 3;
    }
    case 'E': {
      return 4;
    }
    case 'F': {
      return 5;
    }
    case 'F#': {
      return 6;
    }
    case 'G': {
      return 7;
    }
    case 'G#': {
      return 8;
    }
    case 'A': {
      return 9;
    }
    case 'A#': {
      return 10;
    }
    case 'B': {
      return 11;
    }
    case 'Chigh': {
      return 12;
    }
    default: {
      throw new Error(`MIDI: unsupported note "${note}"`);
    }
  }
};

export const patternTempo = (pattern: TB303Pattern): number =>
  typeof pattern.tempo === 'number' ? pattern.tempo : MIDI_DEFAULT_TEMPO;

export const patternTicksPerSecond = (pattern: TB303Pattern): number =>
  (patternTempo(pattern) * MIDI_MESSAGE_PPQN) / 60;

export const patternDurationInTicks = (pattern: TB303Pattern): number =>
  (pattern.steps.length / 4) * MIDI_MESSAGE_PPQN;

export const stepMidiNoteOn = (
  step: { gate: true; pitch: number; velocity: number },
  tick: number,
): MidiMessage => ({
  data: [0x90, step.pitch, step.velocity],
  tick,
});

export const stepMidiNoteOff = (
  step: { gate: true; pitch: number; velocity: number },
  tick: number,
): MidiMessage => ({
  data: [0x80, step.pitch, 0],
  tick,
});

export interface StepGate {
  gate: true;
  pitch: number;
  slide: boolean;
  velocity: number;
}

export interface StepRest {
  gate: false;
}

export type Step = StepGate | StepRest;

export const parseSteps = (steps: TB303Step[]): Step[] => {
  const result: Step[] = [];
  for (const [index, step] of steps.entries()) {
    if (step.number !== index + 1)
      throw new Error(
        `MIDI: step at index ${index} has number ${step.number}, expected ${index + 1}`,
      );
    if (step.time === 'rest') {
      result.push({ gate: false });
      continue;
    }
    if (step.time === 'note') {
      if (typeof step.note !== 'string')
        throw new Error(`MIDI: step ${step.number} has no note`);
      const pitch =
        MIDI_BASE_KEY +
        noteToMidi(step.note) +
        (step.transpose === 'up' ? 12 : step.transpose === 'down' ? -12 : 0);
      result.push({
        gate: true,
        pitch,
        velocity:
          step.accent === true ? MIDI_ACCENT_VELOCITY : MIDI_NORMAL_VELOCITY,
        slide: step.slide === true,
      });
      continue;
    }
    if (step.time === 'tied') {
      const previous = result.pop();
      if (previous === undefined || !previous.gate)
        throw new Error(
          `MIDI: step ${step.number} is tied but not preceded by a note`,
        );
      result.push(
        {
          ...previous,
          slide: true,
        },
        {
          ...previous,
          slide: false,
        },
      );
      continue;
    }
    throw new Error(`MIDI: unsupported step time "${step.time}"`);
  }
  return result;
};
