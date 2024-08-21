import { z } from 'zod';

export const schema = z
  .object({
    name: z.string().max(50),
    username: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormFields = z.infer<typeof schema>;
