import { describe, expect, it } from 'vitest';

import type { TB303Pattern } from '@/types/api';
import { NoteEnum, TimeEnum } from '@/types/api';

import {
  apiPatternToFormData,
  formDataToApiPayload,
  patternCreateSchema as TB303PatternSchema,
} from './patterns';

describe('TB303PatternSchema', () => {
  it('filters out empty trailing steps and assigns step numbers', () => {
    const pattern = {
      name: 'Test',
      bars: [
        {
          steps: [
            { note: NoteEnum.C, time: TimeEnum.note },
            { note: NoteEnum.D, time: TimeEnum.note },
            { note: undefined, time: undefined },
          ],
        },
      ],
    };

    const result = TB303PatternSchema.safeParse(pattern);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bars[0].steps).toHaveLength(2);
      expect(result.data.bars[0].steps[0].number).toBe(1);
      expect(result.data.bars[0].steps[1].number).toBe(2);
    }
  });

  it('removes undefined values', () => {
    const pattern = {
      name: 'Test',
      bars: [
        {
          steps: [
            {
              number: 1,
              note: NoteEnum.C,
              time: TimeEnum.note,
              accent: undefined,
            },
          ],
        },
      ],
    };

    const result = TB303PatternSchema.safeParse(pattern);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bars[0].steps[0]).not.toHaveProperty('accent');
    }
  });

  it('invalidates when empty name', () => {
    const invalidPattern = {
      name: '',
      bars: [
        {
          steps: [
            {
              number: 1,
              note: NoteEnum.C,
              time: TimeEnum.note,
            },
          ],
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
      bars: [
        {
          steps: [],
        },
      ],
    };
    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Bar 1: needs at least one step.',
      );
    }
  });

  it('invalidates when there is a gap between steps', () => {
    const invalidPattern = {
      name: 'Invalid Step Numbers',
      bars: [
        {
          steps: [
            { note: NoteEnum.C, time: TimeEnum.note },
            { note: undefined, time: undefined },
            { note: NoteEnum.D, time: TimeEnum.note },
          ],
        },
      ],
    };
    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Bar 1, Step 2: gaps between steps are not allowed.',
      );
    }
  });

  it('invalidates step where time is "note" but no note is present', () => {
    const invalidPattern = {
      name: 'Invalid Note Step',
      bars: [{ steps: [{ time: TimeEnum.note }] }],
    };
    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Bar 1, Step 1: a note value is required when time is "note".',
      );
    }
  });

  it('invalidates step where time is "rest" but a note is present', () => {
    const invalidPattern = {
      name: 'Invalid Rest Step',
      bars: [
        {
          steps: [{ note: NoteEnum.C, time: TimeEnum.rest }],
        },
      ],
    };

    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Bar 1, Step 1: steps with "rest" time cannot have a note.',
      );
    }
  });

  it('invalidates step where note is set but time is not', () => {
    const invalidPattern = {
      name: 'Invalid Note Step',
      bars: [
        {
          steps: [{ note: NoteEnum.C, time: undefined }],
        },
      ],
    };

    const result = TB303PatternSchema.safeParse(invalidPattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Bar 1, Step 1: time value is required when a note is present.',
      );
    }
  });

  it('invalidates empty bars array', () => {
    const result = TB303PatternSchema.safeParse({ name: 'No Bars', bars: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Add at least one bar.');
    }
  });

  it('assigns sequential bar numbers via preprocessBars', () => {
    const pattern = {
      name: 'Multi Bar',
      bars: [
        { steps: [{ note: NoteEnum.C, time: TimeEnum.note }] },
        { steps: [{ note: NoteEnum.D, time: TimeEnum.note }] },
      ],
    };
    const result = TB303PatternSchema.safeParse(pattern);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bars[0].number).toBe(1);
      expect(result.data.bars[1].number).toBe(2);
    }
  });

  it('invalidates when one of multiple bars has no steps', () => {
    const pattern = {
      name: 'Multi Bar',
      bars: [
        { steps: [{ note: NoteEnum.C, time: TimeEnum.note }] },
        { steps: [] },
      ],
    };
    const result = TB303PatternSchema.safeParse(pattern);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Bar 2: needs at least one step.');
    }
  });

  it('validates a rest step without a note', () => {
    const pattern = {
      name: 'Rest Step',
      bars: [{ steps: [{ time: TimeEnum.rest }] }],
    };
    const result = TB303PatternSchema.safeParse(pattern);
    expect(result.success).toBe(true);
  });

  it('validates correct pattern', () => {
    const validPattern = {
      name: 'Valid Pattern',
      bars: [
        {
          steps: [
            {
              number: 1,
              note: NoteEnum.C,
              time: TimeEnum.note,
              accent: true,
              slide: false,
            },
          ],
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
      bars: [
        {
          steps: [
            {
              number: 1,
              note: NoteEnum.C,
              time: TimeEnum.note,
              accent: true,
              slide: false,
            },
          ],
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

describe('apiPatternToFormData', () => {
  const mockApiPattern: TB303Pattern = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'API Pattern',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    bars: [
      {
        id: '00000000-0000-0000-0000-000000000002',
        number: 1,
        steps: [
          {
            id: '00000000-0000-0000-0000-000000000003',
            number: 1,
            note: NoteEnum.C,
            time: TimeEnum.note,
            accent: true,
            slide: false,
          },
        ],
      },
    ],
  };

  it('strips pattern, bar, and step ids', () => {
    const result = apiPatternToFormData(mockApiPattern);
    expect(result).not.toHaveProperty('id');
    expect(result.bars[0]).not.toHaveProperty('id');
    expect(result.bars[0].steps[0]).not.toHaveProperty('id');
  });

  it('strips created_at and updated_at', () => {
    const result = apiPatternToFormData(mockApiPattern);
    expect(result).not.toHaveProperty('created_at');
    expect(result).not.toHaveProperty('updated_at');
  });

  it('preserves pattern data and step values', () => {
    const result = apiPatternToFormData(mockApiPattern);
    expect(result.name).toBe('API Pattern');
    expect(result.bars[0].steps[0].note).toBe(NoteEnum.C);
    expect(result.bars[0].steps[0].time).toBe(TimeEnum.note);
  });
});

describe('formDataToApiPayload', () => {
  it('produces a valid API payload with bar and step numbers', () => {
    const formData = TB303PatternSchema.parse({
      name: 'Payload Test',
      bars: [
        { steps: [{ note: NoteEnum.C, time: TimeEnum.note }] },
        { steps: [{ note: NoteEnum.D, time: TimeEnum.tied }] },
      ],
    });
    const payload = formDataToApiPayload(formData);
    expect(payload.name).toBe('Payload Test');
    expect(payload.bars[0].number).toBe(1);
    expect(payload.bars[1].number).toBe(2);
    expect(payload.bars[0].steps[0].number).toBe(1);
    expect(payload.bars[0].steps[0].note).toBe(NoteEnum.C);
    expect(payload.bars[0].steps[0].time).toBe(TimeEnum.note);
  });
});
