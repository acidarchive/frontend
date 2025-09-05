import { z } from 'zod';

import {
  createTb303PatternBody,
  updateTb303PatternBody,
} from '@/api/generated/acid.zod';

import {
  applyEmptyToUndefinedTransform,
  cleanUndefined,
  emptyToUndefined,
} from '../utils';

const stepSchema = z
  .object({
    number: z.number().int().min(1).max(16),
  })
  .merge(createTb303PatternBody.shape.steps.element)
  .transform((step, context) => {
    if (step.time === 'rest' && step.note) {
      context.addIssue({
        code: 'custom',
        message: `Step ${step.number}: steps with "rest" time cannot have a note.`,
        path: ['time'],
      });
      return z.NEVER;
    }

    if (step.note && !step.time) {
      context.addIssue({
        code: 'custom',
        message: `Step ${step.number}: time must be set when a note is present.`,
        path: ['time'],
      });
      return z.NEVER;
    }

    return cleanUndefined(step);
  });

export const patternCreateSchema = createTb303PatternBody
  .extend({
    name: z.string().min(1, 'Pattern name is required'),
    steps: z.preprocess(
      steps => {
        if (!Array.isArray(steps)) return steps;

        return steps
          .map((step, index) => ({
            ...step,
            number: index + 1,
            note: emptyToUndefined(step.note),
            time: emptyToUndefined(step.time),
            transpose: emptyToUndefined(step.transpose),
          }))
          .filter(step => {
            if (!step.note && !step.time) return false;
            return true;
          });
      },
      z
        .array(stepSchema)
        .min(1, {
          message: 'You need to add at least one step to the pattern.',
        })
        .superRefine((steps, context) => {
          for (let index = 1; index < steps.length; index++) {
            if (steps[index].number !== steps[index - 1].number + 1) {
              context.addIssue({
                code: 'custom',
                message: `Step ${steps[index - 1].number + 1}: gaps between steps are not allowed.`,
              });
              return;
            }
          }
        }),
    ),
  })
  .transform(data =>
    applyEmptyToUndefinedTransform(data, [
      'author',
      'title',
      'description',
      'waveform',
      'triplets',
      'tempo',
      'tuning',
      'cut_off_freq',
      'resonance',
      'env_mod',
      'decay',
      'accent',
    ]),
  );

export const patternUpdateSchema = updateTb303PatternBody.transform(data =>
  applyEmptyToUndefinedTransform(data, [
    'author',
    'title',
    'description',
    'waveform',
    'triplets',
    'tempo',
    'tuning',
    'cut_off_freq',
    'resonance',
    'env_mod',
    'decay',
    'accent',
  ]),
);

export type PatternFormData = z.infer<typeof patternCreateSchema>;
export const PatternFormSchema = patternCreateSchema;

import type { CreateTB303Pattern, TB303Pattern } from '@/types/api';

export function apiPatternToFormData(pattern: TB303Pattern): PatternFormData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, updated_at, ...formData } = pattern;

  const transformedSteps =
    pattern.steps?.map((step, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...stepData } = step;
      return {
        ...stepData,
        number: index + 1, // Ensure proper numbering
      };
    }) || [];

  return patternCreateSchema.parse({
    ...formData,
    steps: transformedSteps,
  });
}

export function formDataToApiPayload(
  formData: PatternFormData,
): CreateTB303Pattern {
  return createTb303PatternBody.parse(formData) as CreateTB303Pattern;
}
