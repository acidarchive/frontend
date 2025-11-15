import { z } from 'zod';

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(1, { error: 'Username is required.' })
      .min(2, { error: 'Username must be at least 2 characters long.' })
      .trim(),
    email: z
      .string()
      .min(1, { error: 'Email is required.' })
      .email({ error: 'Please enter a valid email.' })
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

export type SignupFormState = {
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
} & Partial<z.ZodFlattenedError<z.infer<typeof SignupFormSchema>>>;
