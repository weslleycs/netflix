import { z } from 'zod';

const rateValue = z.coerce.number().int().min(1).max(10);

export const registerRateMovieBodySchema = z.object({
  movieId: z.coerce.number().int().positive(),
  rate: rateValue,
});

export const registerRateSerieBodySchema = z.object({
  serieId: z.coerce.number().int().positive(),
  rate: rateValue,
});

export const getRateMovieQuerySchema = z.object({
  movieId: z.coerce.number().int().positive(),
});

export const getRateSerieQuerySchema = z.object({
  serieId: z.coerce.number().int().positive(),
});
