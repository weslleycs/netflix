import { z } from 'zod';

export const registerGenreBodySchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().min(1, 'Description is required'),
});

export const registerGenreMovieBodySchema = z.object({
  movieId: z.coerce.number().int().positive(),
  genreId: z.array(z.coerce.number().int().positive()).nonempty('genreId must not be empty'),
});
