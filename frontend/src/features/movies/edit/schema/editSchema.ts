import { z } from 'zod';

export const editSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string(),
});

export type EditFormValues = z.infer<typeof editSchema>;
