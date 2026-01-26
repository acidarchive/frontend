import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { error: 'Current password is required.' }),
    newPassword: z
      .string()
      .min(1, { error: 'New password is required.' })
      .min(8, { error: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, {
        error: 'Password must contain at least one letter.',
      })
      .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Password must contain at least one special character.',
      })
      .trim(),
    confirmNewPassword: z
      .string()
      .min(1, { error: 'Please confirm your new password.' }),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    error: 'Passwords do not match.',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordFormState = {
  success?: boolean;
  data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
} & Partial<z.ZodFlattenedError<z.infer<typeof ChangePasswordSchema>>>;
