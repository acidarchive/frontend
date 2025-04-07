import { Note, Octave, PatternTB303Type, Time, Waveform } from './types';

export const pattern: PatternTB303Type = {
  author: 'Humanoind',
  title: 'Stakker humanoid',
  description:
    "This is a demo pattern for the TB-303. It's a classic acid house pattern.",
  waveform: Waveform.Sawtooth,
  triplets: false,
  bpm: 120,
  cut_off_freq: 50,
  resonance: 50,
  accent: 50,
  decay: 50,
  env_mod: 50,
  steps: [
    {
      number: 1,
      note: Note.B,
      time: Time.Note,
    },
    {
      number: 2,
      note: Note.D,
      time: Time.Note,
    },
    {
      number: 3,
      note: Note.B,
      octave: Octave.Down,
      time: Time.Note,
    },
    {
      number: 4,
      octave: Octave.Down,
      time: Time.Tied,
    },
    {
      number: 5,
      note: Note.B,
      octave: Octave.Down,
      time: Time.Note,
      slide: true,
    },
    {
      number: 6,
      note: Note.B,
      octave: Octave.Down,
      time: Time.Note,
      accent: true,
      slide: true,
    },
    {
      number: 7,
      time: Time.Tied,
    },
    {
      number: 8,
      note: Note.B,
      octave: Octave.Down,
      time: Time.Note,
    },
    {
      number: 9,
      note: Note.D,
      octave: Octave.Down,
      time: Time.Note,
    },
    {
      number: 10,
      note: Note.D,
      time: Time.Note,
    },
    {
      number: 11,
      note: Note.B,
      octave: Octave.Down,
      time: Time.Note,
    },
    {
      number: 12,
      note: Note.D,
      time: Time.Note,
    },
    {
      number: 13,
      time: Time.Tied,
    },
    {
      number: 14,
      note: Note.B,
      octave: Octave.Down,
      time: Time.Note,
    },
    {
      number: 15,
      note: Note.F,
      time: Time.Note,
    },
    {
      number: 16,
      time: Time.Tied,
    },
  ],
};
