import { z } from 'zod';

export const registerCommentMovieBodySchema = z.object({
  comment: z.string().trim().min(1, 'Comment is required'),
  movieId: z.coerce.number().int().positive(),
});

export const registerCommentSerieBodySchema = z.object({
  comment: z.string().trim().min(1, 'Comment is required'),
  serieId: z.coerce.number().int().positive(),
});

export const commentIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const editCommentBodySchema = z.object({
  comment: z.string().trim().min(1, 'Comment is required'),
});

export const getCommentsSerieQuerySchema = z.object({
  serieId: z.coerce.number().int().positive(),
});
