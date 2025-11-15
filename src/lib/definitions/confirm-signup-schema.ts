import { z } from 'zod';

export const ConfirmSignupFormSchema = z.object({
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  code: z
    .string()
    .min(1, { error: 'Code is required.' })
    .length(6, { error: 'Code must be 6 digits.' })
    .regex(/^\d+$/, { error: 'Code must contain only numbers.' }),
});

export type ConfirmSignupFormState = {
  data: {
    username: string;
    code: string;
  };
  message?: string;
} & Partial<z.ZodFlattenedError<z.infer<typeof ConfirmSignupFormSchema>>>;
