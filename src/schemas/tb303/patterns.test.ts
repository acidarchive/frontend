import { describe, expect, it } from 'vitest';

import { NoteEnum, TimeEnum } from '@/types/api';

import { patternCreateSchema as TB303PatternSchema } from './patterns';

describe('TB303PatternSchema', () => {
  it('filters out empty trailing steps and assigns step numbers', () => {
    const pattern = {
      name: 'Test',
      steps: [
        { note: NoteEnum.C, time: TimeEnum.note },
        { note: NoteEnum.D, time: TimeEnum.note },
        { note: undefined, time: undefined },
      ],
    };

    const result = TB303PatternSchema.safeParse(pattern);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.steps).toHaveLength(2);
      expect(result.data.steps[0].number).toBe(1);
      expect(result.data.steps[1].number).toBe(2);
    }
  });

  it('removes undefined values', () => {
    const pattern = {
      name: 'Test',
      steps: [
        { number: 1, note: NoteEnum.C, time: TimeEnum.note, accent: undefined },
      ],
    };

    const result = TB303PatternSchema.safeParse(pattern);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.steps[0]).not.toHaveProperty('accent');
    }
  });

  it('invalidates when empty name', () => {
    const invalidPattern = {
      name: '',
      steps: [
        {
          number: 1,
          note: NoteEnum.C,
          time: TimeEnum.note,
        },
      ],
    };
    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Pattern name is required');
    }
  });

  it('invalidates when no steps', () => {
    const invalidPattern = {
      name: 'No Steps Pattern',
      steps: [],
    };
    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'You need to add at least one step to the pattern.',
      );
    }
  });

  it('invalidates when there is a gap between steps', () => {
    const invalidPattern = {
      name: 'Invalid Step Numbers',
      steps: [
        { note: NoteEnum.C, time: TimeEnum.note },
        { note: undefined, time: undefined },
        { note: NoteEnum.D, time: TimeEnum.note },
      ],
    };
    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Step 2: gaps between steps are not allowed.',
      );
    }
  });

  it('invalidates step where time is "rest" but a note is present', () => {
    const invalidPattern = {
      name: 'Invalid Rest Step',
      steps: [{ note: NoteEnum.C, time: TimeEnum.rest }],
    };

    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Step 1: steps with "rest" time cannot have a note.',
      );
    }
  });

  it('invalidates step where note is set but time is not', () => {
    const invalidPattern = {
      name: 'Invalid Note Step',
      steps: [{ note: NoteEnum.C, time: undefined }],
    };

    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        'Invalid option: expected one of',
      );
    }
  });

  it('validates correct pattern', () => {
    const validPattern = {
      name: 'Valid Pattern',
      steps: [
        {
          number: 1,
          note: NoteEnum.C,
          time: TimeEnum.note,
          accent: true,
          slide: false,
        },
      ],
    };
    const result = TB303PatternSchema.safeParse(validPattern);
    expect(result.success).toBe(true);
  });

  it('validates knob controls', () => {
    const validPattern = {
      name: 'Valid Pattern',
      tuning: 10,
      cut_off_freq: 20,
      resonance: 30,
      env_mod: 40,
      decay: 50,
      accent: 60,
      steps: [
        {
          number: 1,
          note: NoteEnum.C,
          time: TimeEnum.note,
          accent: true,
          slide: false,
        },
      ],
    };
    const result = TB303PatternSchema.safeParse(validPattern);
    expect(result.success).toBe(true);
    expect(result.data?.tuning).toBe(10);
    expect(result.data?.cut_off_freq).toBe(20);
    expect(result.data?.resonance).toBe(30);
    expect(result.data?.env_mod).toBe(40);
    expect(result.data?.decay).toBe(50);
    expect(result.data?.accent).toBe(60);
  });
});
