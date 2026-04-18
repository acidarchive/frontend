import { z } from 'zod';

import {
  createTb303PatternBody,
  updateTb303PatternBody,
} from '@/api/generated/acid.zod';
import type { CreateTB303Pattern, TB303Pattern } from '@/types/api';

import {
  applyEmptyToUndefinedTransform,
  cleanUndefined,
  emptyToUndefined,
} from '../utils';

const stepBase = createTb303PatternBody.shape.bars.element.shape.steps.element;

const stepSchema = z
  .object({
    number: z.number().int().min(1).max(16),
    _barNumber: z.number().int(),
  })
  .merge(stepBase.extend({ time: stepBase.shape.time.optional() }))
  .transform((step, context) => {
    const stepContext = `Bar ${step._barNumber}, Step ${step.number}`;

    if (step.note && !step.time) {
      context.addIssue({
        code: 'custom',
        message: `${stepContext}: time value is required when a note is present.`,
        path: ['time'],
      });
      return z.NEVER;
    }

    if (step.time === 'note' && !step.note) {
      context.addIssue({
        code: 'custom',
        message: `${stepContext}: a note value is required when time is "note".`,
        path: ['note'],
      });
      return z.NEVER;
    }

    if (step.time === 'rest' && step.note) {
      context.addIssue({
        code: 'custom',
        message: `${stepContext}: steps with "rest" time cannot have a note.`,
        path: ['time'],
      });
      return z.NEVER;
    }

    const { _barNumber: _, ...rest } = step;
    return cleanUndefined(rest);
  });

const preprocessBars = (bars: unknown) => {
  if (!Array.isArray(bars)) return bars;
  return bars.map((bar, barIndex) => ({
    ...bar,
    number: barIndex + 1,
    steps: Array.isArray(bar.steps)
      ? bar.steps.map((step: unknown) => ({
          ...(step as object),
          _barNumber: barIndex + 1,
        }))
      : bar.steps,
  }));
};

const preprocessSteps = (steps: unknown) => {
  if (!Array.isArray(steps)) return steps;
  return steps
    .map((step, index) => ({
      ...step,
      number: index + 1,
      note: emptyToUndefined(step.note),
      time: emptyToUndefined(step.time),
      transpose: emptyToUndefined(step.transpose),
    }))
    .filter(step => step.note || step.time);
};

const barSchema = z
  .object({
    number: z.number(),
    steps: z.preprocess(preprocessSteps, z.array(stepSchema)),
  })
  .superRefine((bar, context) => {
    const steps = bar.steps as Array<{ number: number }>;

    if (steps.length === 0) {
      context.addIssue({
        code: 'custom',
        message: `Bar ${bar.number}: needs at least one step.`,
        path: ['steps'],
      });
      return;
    }

    for (let index = 1; index < steps.length; index++) {
      if (steps[index].number !== steps[index - 1].number + 1) {
        context.addIssue({
          code: 'custom',
          message: `Bar ${bar.number}, Step ${steps[index - 1].number + 1}: gaps between steps are not allowed.`,
          path: ['steps'],
        });
        return;
      }
    }
  });

export const patternCreateSchema = createTb303PatternBody
  .extend({
    name: z
      .string({ error: 'Pattern name is required' })
      .min(1, 'Pattern name is required'),
    bars: z.preprocess(
      preprocessBars,
      z.array(barSchema).min(1, { message: 'Add at least one bar.' }),
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

export function apiPatternToFormData(pattern: TB303Pattern): PatternFormData {
  const { id: _, created_at: _c, updated_at: _u, ...formData } = pattern;

  const bars = (pattern.bars ?? []).map(bar => {
    const { id: _, ...barData } = bar;
    return {
      ...barData,
      steps: bar.steps.map(step => {
        const { id: _, ...stepData } = step;
        return stepData;
      }),
    };
  });

  return patternCreateSchema.parse({
    ...formData,
    bars,
  });
}

export function formDataToApiPayload(
  formData: PatternFormData,
): CreateTB303Pattern {
  return createTb303PatternBody.parse(formData) as CreateTB303Pattern;
}
