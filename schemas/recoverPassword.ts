import { z } from 'zod';

export const schema = z.object({
  username: z.string(),
});

export type FormFields = z.infer<typeof schema>;
