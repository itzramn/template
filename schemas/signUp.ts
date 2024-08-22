import { z } from 'zod';

export const schema = z
  .object({
    name: z
      .string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(300, 'El nombre no puede exceder los 300 caracteres'),
    username: z
      .string()
      .min(6, 'El usuario debe tener al menos 6 caracteres')
      .max(200, 'El usuario no puede exceder los 200 caracteres'),
    email: z
      .string()
      .email('Por favor, ingresa un correo válido')
      .max(300, 'El correo no puede exceder los 300 caracteres'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(200, 'La contraseña no puede exceder los 200 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormFields = z.infer<typeof schema>;
