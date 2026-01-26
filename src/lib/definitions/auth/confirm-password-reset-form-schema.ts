import { z } from 'zod';

export const ConfirmPasswordResetFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { error: 'Email is required.' })
      .email({ error: 'Please enter a valid email.' })
      .trim(),
    code: z
      .string()
      .min(1, { error: 'Verification code is required.' })
      .length(6, { error: 'Verification code must be 6 digits.' })
      .regex(/^\d+$/, { error: 'Verification code must contain only numbers.' })
      .trim(),
    password: z
      .string()
      .min(1, { error: 'Password is required.' })
      .min(8, { error: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, {
        error: 'Password must contain at least one letter.',
      })
      .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Password must contain at least one special character.',
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { error: 'Please confirm your password.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ConfirmPasswordResetFormState = {
  data: {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
  };
} & Partial<
  z.ZodFlattenedError<z.infer<typeof ConfirmPasswordResetFormSchema>>
>;
