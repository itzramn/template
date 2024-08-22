import { z } from 'zod';

export const schema = z.object({
  username: z
    .string()
    .min(6, 'El usuario debe tener al menos 6 caracteres')
    .max(200, 'El usuario no puede exceder los 200 caracteres'),
});

export type FormFields = z.infer<typeof schema>;
