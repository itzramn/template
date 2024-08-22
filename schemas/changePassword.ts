import { z } from 'zod';

export const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export type FormFields = z.infer<typeof schema>;
