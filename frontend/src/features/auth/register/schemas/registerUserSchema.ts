import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(2,"Name invalid"),
  email: z.string().email("Email invalido"),
  password: z.string().min(6,"Password invalid")
});

export type RegisterUserFormValues = z.infer<typeof registerUserSchema>;

