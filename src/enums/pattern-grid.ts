import { Note, Time, Transpose } from '@/api/generated/model';

export const TOTAL_STEPS = 16;
export const HIGHLIGHT_STEPS = new Set([0, 4, 8, 12]);

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export const NOTE_OPTIONS: SelectOption<Note>[] = [
  { value: Note['C'], label: 'C' },
  { value: Note['C#'], label: 'C#' },
  { value: Note['D'], label: 'D' },
  { value: Note['D#'], label: 'D#' },
  { value: Note['E'], label: 'E' },
  { value: Note['F'], label: 'F' },
  { value: Note['F#'], label: 'F#' },
  { value: Note['G'], label: 'G' },
  { value: Note['G#'], label: 'G#' },
  { value: Note['A'], label: 'A' },
  { value: Note['A#'], label: 'A#' },
  { value: Note['B'], label: 'B' },
  { value: Note['Chigh'], label: "C'" },
];

export const TRANSPOSE_OPTIONS: SelectOption<Transpose>[] = [
  { value: Transpose.up, label: '▲' },
  { value: Transpose.down, label: '▼' },
];

export const TIME_OPTIONS: SelectOption<Time>[] = [
  { value: Time.note, label: '●' },
  { value: Time.tied, label: '○' },
  { value: Time.rest, label: '▬' },
];

export const BOOLEAN_OPTIONS: SelectOption<boolean>[] = [
  { value: true, label: '●' },
  { value: false, label: '' },
];
