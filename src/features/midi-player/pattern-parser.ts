import {
  Note,
  NoteEnum,
  TB303Pattern,
  TB303Step,
  TimeEnum,
  TransposeEnum,
} from '@/types/api';

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
  [NoteEnum.C]: 0,
  [NoteEnum['C#']]: 1,
  [NoteEnum.D]: 2,
  [NoteEnum['D#']]: 3,
  [NoteEnum.E]: 4,
  [NoteEnum.F]: 5,
  [NoteEnum['F#']]: 6,
  [NoteEnum.G]: 7,
  [NoteEnum['G#']]: 8,
  [NoteEnum.A]: 9,
  [NoteEnum['A#']]: 10,
  [NoteEnum.B]: 11,
  [NoteEnum.Chigh]: 12,
};

export const noteToMidi = (note: Note): number => NOTE_TO_MIDI_MAP[note];

export const patternTempo = (pattern: TB303Pattern): number =>
  typeof pattern.tempo === 'number' ? pattern.tempo : MIDI_DEFAULT_TEMPO;

export const tempoToTicksPerSecond = (tempo: number): number =>
  (tempo * MIDI_MESSAGE_PPQN) / 60;

export const patternTicksPerSecond = (pattern: TB303Pattern): number =>
  tempoToTicksPerSecond(patternTempo(pattern));

export const stepDurationSeconds = (tempo: number): number =>
  MIDI_MESSAGE_PPQN / 4 / tempoToTicksPerSecond(tempo);

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

const isNote = (s: unknown): s is Note =>
  typeof s === 'string' && s in NoteEnum;

export const parseSteps = (steps: TB303Step[]): Step[] => {
  const result: Step[] = [];
  for (const [index, step] of steps.entries()) {
    if (step.number !== index + 1)
      throw new Error(
        `MIDI: step at index ${index} has number ${step.number}, expected ${index + 1}`,
      );
    if (step.time === TimeEnum.rest) {
      result.push({ gate: false });
      continue;
    }
    if (step.time === TimeEnum.note) {
      if (!isNote(step.note))
        throw new Error(`MIDI: step ${step.number} has no note`);
      const pitch =
        MIDI_BASE_KEY +
        noteToMidi(step.note) +
        (step.transpose === TransposeEnum.up
          ? 12
          : step.transpose === TransposeEnum.down
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
    if (step.time === TimeEnum.tied) {
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
