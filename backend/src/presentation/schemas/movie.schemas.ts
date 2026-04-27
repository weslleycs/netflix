import { z } from 'zod';

export const registerMovieBodySchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  imageUrl: z.string().trim().url('Invalid imageUrl').optional(),
});

export const listMoviesQuerySchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(1).optional(),
  genre: z.string().trim().min(1).optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export const movieIdQuerySchema = z.object({
  movieId: z.coerce.number().int().positive(),
});

export const movieIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateMovieBodySchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    imageUrl: z.string().trim().url('Invalid imageUrl').optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });
