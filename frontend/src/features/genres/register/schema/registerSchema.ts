import { z } from 'zod'

export const registerGenreSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  description: z.string().min(2, 'Description must have at least 2 characters'),
})

export type RegisterGenreFormValues = z.infer<typeof registerGenreSchema>
