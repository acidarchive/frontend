import {
  Note,
  TB303Pattern,
  TB303Step,
  Time,
  Transpose,
} from '@/api/generated/model';

export interface MidiMessage {
  data: number[];
  tick: number;
}

export const MIDI_MESSAGE_PPQN = 24;

const MIDI_ACCENT_VELOCITY = 127;
const MIDI_NORMAL_VELOCITY = 1;
const MIDI_BASE_KEY = 36;
const MIDI_DEFAULT_TEMPO = 120;

const NOTE_TO_MIDI_MAP: Record<Note, number> = {
  [Note.C]: 0,
  [Note['C#']]: 1,
  [Note.D]: 2,
  [Note['D#']]: 3,
  [Note.E]: 4,
  [Note.F]: 5,
  [Note['F#']]: 6,
  [Note.G]: 7,
  [Note['G#']]: 8,
  [Note.A]: 9,
  [Note['A#']]: 10,
  [Note.B]: 11,
  [Note.Chigh]: 12,
};

export const noteToMidi = (note: Note): number => NOTE_TO_MIDI_MAP[note];

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

const isNote = (s: unknown): s is Note => typeof s === 'string' && s in Note;

export const parseSteps = (steps: TB303Step[]): Step[] => {
  const result: Step[] = [];
  for (const [index, step] of steps.entries()) {
    if (step.number !== index + 1)
      throw new Error(
        `MIDI: step at index ${index} has number ${step.number}, expected ${index + 1}`,
      );
    if (step.time === Time.rest) {
      result.push({ gate: false });
      continue;
    }
    if (step.time === Time.note) {
      if (!isNote(step.note))
        throw new Error(`MIDI: step ${step.number} has no note`);
      const pitch =
        MIDI_BASE_KEY +
        noteToMidi(step.note) +
        (step.transpose === Transpose.up
          ? 12
          : step.transpose === Transpose.down
            ? -12
            : 0);
      result.push({
        gate: true,
        pitch,
        velocity:
          step.accent === true ? MIDI_ACCENT_VELOCITY : MIDI_NORMAL_VELOCITY,
        slide: step.slide === true,
      });
      continue;
    }
    if (step.time === Time.tied) {
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
