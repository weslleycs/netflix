import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { commentMovieFactory } from '@infrastructure/factories/movies/commentMovieFactory';
import { getAllMovieFactory } from '@infrastructure/factories/movies/getAllFactory';
import { getCommentsAndRateMovieByIdFactory } from '@infrastructure/factories/movies/getCommentsAndRateMovieByIdFactory';
import { movieDetailsFactory } from '@infrastructure/factories/movies/movieDetailsFactory';
import { registerMovieFactory } from '@infrastructure/factories/movies/registerFactory';
import { updaterMovieFactory } from '@infrastructure/factories/movies/updaterMovieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { requireAuth } from '@presentation/middlewares/requireAuth.middleware';
import { validate } from '@presentation/middlewares/validate.middleware';
import {
  listMoviesQuerySchema,
  movieIdParamsSchema,
  movieIdQuerySchema,
  registerMovieBodySchema,
  updateMovieBodySchema,
} from '@presentation/schemas/movie.schemas';
import { Router } from 'express';

export function movieRoutes(router: Router, prismaService: PrismaService) {
  router.post(
    '/movie/register',
    requireAuth,
    validate({ body: registerMovieBodySchema }),
    (req, res) => expressRouteAdapter(req, res, registerMovieFactory(prismaService)),
  );
  router.get(
    '/movie/list',
    requireAuth,
    validate({ query: listMoviesQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, getAllMovieFactory(prismaService)),
  );
  router.get(
    '/movie/comments-rate',
    requireAuth,
    validate({ query: movieIdQuerySchema }),
    (req, res) =>
      expressRouteAdapter(req, res, getCommentsAndRateMovieByIdFactory(prismaService)),
  );
  router.put(
    '/movie/updater/:id',
    requireAuth,
    validate({ params: movieIdParamsSchema, body: updateMovieBodySchema }),
    (req, res) => expressRouteAdapter(req, res, updaterMovieFactory(prismaService)),
  );
  router.get(
    '/movie/comments',
    requireAuth,
    validate({ query: movieIdQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, commentMovieFactory(prismaService)),
  );
  router.get(
    '/movie/details',
    requireAuth,
    validate({ query: movieIdQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, movieDetailsFactory(prismaService)),
  );
}
