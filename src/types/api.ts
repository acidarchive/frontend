/**
 * Type aliases inferred from Zod schemas
 * Single source of truth for API types
 */

import { z } from 'zod';

import {
  createTb303PatternBody,
  getTb303PatternResponse,
  listTb303PatternsResponse,
  listTb303PatternsResponseItem,
  updateTb303PatternBody,
} from '@/api/generated/acid.zod';

export type TB303Pattern = z.infer<typeof getTb303PatternResponse>;
export type TB303PatternSummary = z.infer<typeof listTb303PatternsResponseItem>;
export type TB303PatternsList = z.infer<typeof listTb303PatternsResponse>;

export type CreateTB303Pattern = z.infer<typeof createTb303PatternBody>;
export type UpdateTB303Pattern = z.infer<typeof updateTb303PatternBody>;

export type TB303Step = NonNullable<TB303Pattern['steps']>[number];

// TODO: extract from OpenAPI schema
const noteSchema = z.enum([
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
  'Chigh',
]);
const timeSchema = z.enum(['note', 'tied', 'rest']);
const transposeSchema = z.enum(['up', 'down']);

export const NoteEnum = noteSchema.enum;
export const TimeEnum = timeSchema.enum;
export const TransposeEnum = transposeSchema.enum;

export type Note = z.infer<typeof noteSchema>;
export type Time = z.infer<typeof timeSchema>;
export type Transpose = z.infer<typeof transposeSchema>;
