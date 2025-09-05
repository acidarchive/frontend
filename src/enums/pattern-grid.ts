import {
  Note,
  NoteEnum,
  Time,
  TimeEnum,
  Transpose,
  TransposeEnum,
} from '@/types/api';

export const TOTAL_STEPS = 16;
export const HIGHLIGHT_STEPS = new Set([0, 4, 8, 12]);

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export const NOTE_OPTIONS: SelectOption<Note>[] = [
  { value: NoteEnum['C'], label: 'C' },
  { value: NoteEnum['C#'], label: 'C#' },
  { value: NoteEnum['D'], label: 'D' },
  { value: NoteEnum['D#'], label: 'D#' },
  { value: NoteEnum['E'], label: 'E' },
  { value: NoteEnum['F'], label: 'F' },
  { value: NoteEnum['F#'], label: 'F#' },
  { value: NoteEnum['G'], label: 'G' },
  { value: NoteEnum['G#'], label: 'G#' },
  { value: NoteEnum['A'], label: 'A' },
  { value: NoteEnum['A#'], label: 'A#' },
  { value: NoteEnum['B'], label: 'B' },
  { value: NoteEnum['Chigh'], label: "C'" },
];

export const TRANSPOSE_OPTIONS: SelectOption<Transpose>[] = [
  { value: TransposeEnum.up, label: '▲' },
  { value: TransposeEnum.down, label: '▼' },
];

export const TIME_OPTIONS: SelectOption<Time>[] = [
  { value: TimeEnum.note, label: '●' },
  { value: TimeEnum.tied, label: '○' },
  { value: TimeEnum.rest, label: '▬' },
];

export const BOOLEAN_OPTIONS: SelectOption<boolean>[] = [
  { value: true, label: '●' },
  { value: false, label: '' },
];
