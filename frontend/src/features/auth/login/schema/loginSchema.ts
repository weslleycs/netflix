import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("email invalido"),
  password: z.string().min(6,"Password invalid"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;