import { z } from 'zod';

export const PasswordResetFormSchema = z.object({
  email: z
    .string()
    .min(1, { error: 'Email is required.' })
    .email({ error: 'Please enter a valid email.' })
    .trim(),
});

export type PasswordResetFormState = {
  data: {
    email: string;
  };
} & Partial<z.ZodFlattenedError<z.infer<typeof PasswordResetFormSchema>>>;
