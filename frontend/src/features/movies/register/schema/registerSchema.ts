import { z } from "zod";

export const registerSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    genre:z.string()
  })
  
export type RegisterFormValues = z.infer<typeof registerSchema>;