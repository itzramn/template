import { z } from 'zod';

const schema = z
  .object({
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormFields = z.infer<typeof schema>;

export default schema;
