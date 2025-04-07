export const TOTAL_STEPS = 16;
export const HIGHLIGHT_STEPS = new Set([0, 4, 8, 12]);

export enum Waveform {
  Square = 'square',
  Sawtooth = 'sawtooth',
}

export enum Octave {
  Up = 'up',
  Down = 'down',
}

export enum Time {
  Note = 'note',
  Tied = 'tied',
  Rest = 'rest',
}

export enum Note {
  C = 'C',
  CSharp = 'C#',
  D = 'D',
  DSharp = 'D#',
  E = 'E',
  F = 'F',
  FSharp = 'F#',
  G = 'G',
  GSharp = 'G#',
  A = 'A',
  ASharp = 'A#',
  B = 'B',
  Chigh = 'Chigh',
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export const NOTE_OPTIONS: SelectOption<Note>[] = [
  { value: Note.C, label: 'C' },
  { value: Note.CSharp, label: 'C#' },
  { value: Note.D, label: 'D' },
  { value: Note.DSharp, label: 'D#' },
  { value: Note.E, label: 'E' },
  { value: Note.F, label: 'F' },
  { value: Note.FSharp, label: 'F#' },
  { value: Note.G, label: 'G' },
  { value: Note.GSharp, label: 'G#' },
  { value: Note.A, label: 'A' },
  { value: Note.ASharp, label: 'A#' },
  { value: Note.B, label: 'B' },
  { value: Note.Chigh, label: "C'" },
];

export const OCTAVE_OPTIONS: SelectOption<Octave>[] = [
  { value: Octave.Up, label: '▲' },
  { value: Octave.Down, label: '▼' },
];

export const TIME_OPTIONS: SelectOption<Time>[] = [
  { value: Time.Note, label: '●' },
  { value: Time.Tied, label: '○' },
  { value: Time.Rest, label: '▬' },
];

export interface PatternTB303Step {
  number: number;
  note?: Note;
  octave?: Octave;
  time: Time;
  slide?: boolean;
  accent?: boolean;
}

export type PatternTB303Type = {
  author: string;
  title: string;
  description: string;
  triplets: boolean;
  bpm: number;
  waveform: Waveform;
  cut_off_freq: number;
  resonance: number;
  env_mod: number;
  decay: number;
  accent: number;
  steps: PatternTB303Step[];
};
