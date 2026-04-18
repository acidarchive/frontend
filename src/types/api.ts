/**
 * Type aliases inferred from Zod schemas
 * Single source of truth for API types
 */

import { z } from 'zod';

import {
  createTb303PatternBody,
  getMeResponse,
  getTb303PatternResponse,
  listPublicTb303PatternsResponse,
  listTb303PatternsResponse,
  listTb303PatternsResponseItem,
  patchMeBody,
  patchMeResponse,
  presignUploadBody,
  updateTb303PatternBody,
} from '@/api/generated/acid.zod';

export type TB303Pattern = z.infer<typeof getTb303PatternResponse>;
export type TB303PatternSummary = z.infer<typeof listTb303PatternsResponseItem>;
export type TB303PatternsList = z.infer<typeof listTb303PatternsResponse>;

export type CreateTB303Pattern = z.infer<typeof createTb303PatternBody>;
export type UpdateTB303Pattern = z.infer<typeof updateTb303PatternBody>;

export type TB303Bar = NonNullable<TB303Pattern['bars']>[number];
export type TB303Step = TB303Bar['steps'][number];

export type PublicTB303PatternItem = z.infer<
  typeof listPublicTb303PatternsResponse
>['data'][number];
export type PublicTB303PatternsList = z.infer<
  typeof listPublicTb303PatternsResponse
>;

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

export type Me = z.infer<typeof getMeResponse>;
export type UpdateMe = z.infer<typeof patchMeBody>;
export type UpdateMeResponse = z.infer<typeof patchMeResponse>;

export const presignContentTypeSchema = presignUploadBody.shape.content_type;
export type PresignContentType = z.infer<typeof presignContentTypeSchema>;
