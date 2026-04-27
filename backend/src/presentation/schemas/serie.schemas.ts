import { z } from 'zod';

export const registerSerieBodySchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  imageUrl: z.string().trim().url('Invalid imageUrl').optional(),
});

export const listSeriesQuerySchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(1).optional(),
  genre: z.string().trim().min(1).optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const serieIdQuerySchema = z.object({
  serieId: z.coerce.number().int().positive(),
});
