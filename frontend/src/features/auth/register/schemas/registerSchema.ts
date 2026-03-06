import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome precisa ter pelo menos 2 caracteres'),
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
