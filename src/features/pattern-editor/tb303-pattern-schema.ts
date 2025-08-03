import { z } from 'zod';

import { Note, Time, Transpose, Waveform } from '@/api/generated/model';

const emptyToUndefined = (value: unknown) =>
  value === '' || value === null ? undefined : value;

const TB303StepsSchema = z
  .object({
    number: z.number().int().min(1).max(16),
    note: z.preprocess(emptyToUndefined, z.enum(Note).optional()),
    transpose: z.preprocess(emptyToUndefined, z.enum(Transpose).optional()),
    accent: z.boolean().optional(),
    slide: z.boolean().optional(),
    time: z.preprocess(emptyToUndefined, z.enum(Time).optional()),
  })
  .transform((step, context) => {
    if (step.time === Time.rest && step.note) {
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

    const newStep = {
      ...step,
      time: step.time!,
    };

    return Object.fromEntries(
      Object.entries(newStep).filter(([, value]) => value !== undefined),
    ) as typeof newStep;
  });

export const TB303PatternSchema = z.object({
  name: z.string().min(1, { message: 'Pattern name is required' }),
  is_public: z.boolean().optional(),
  author: z.preprocess(emptyToUndefined, z.string().optional()),
  title: z.preprocess(emptyToUndefined, z.string().optional()),
  description: z.preprocess(emptyToUndefined, z.string().optional()),
  waveform: z.preprocess(emptyToUndefined, z.enum(Waveform).optional()),
  triplets: z.preprocess(emptyToUndefined, z.boolean().optional()),
  tempo: z.preprocess(emptyToUndefined, z.number().int().optional()),
  tuning: z.preprocess(emptyToUndefined, z.number().int().optional()),
  cut_off_freq: z.preprocess(emptyToUndefined, z.number().int().optional()),
  resonance: z.preprocess(emptyToUndefined, z.number().int().optional()),
  env_mod: z.preprocess(emptyToUndefined, z.number().int().optional()),
  decay: z.preprocess(emptyToUndefined, z.number().int().optional()),
  accent: z.preprocess(emptyToUndefined, z.number().int().optional()),
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
      .array(TB303StepsSchema)
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
});

export type TB303PatternSchemaType = z.infer<typeof TB303PatternSchema>;
