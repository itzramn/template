import { z } from 'zod';

const schema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(200, 'La contraseña no puede exceder los 200 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormFields = z.infer<typeof schema>;

export default schema;
