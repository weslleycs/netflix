import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { getAllMovieFactory } from '@infrastructure/factories/movies/getAllFactory';
import { getByTitleMovieFactory } from '@infrastructure/factories/movies/getByTitleFactory';
import { getCommentsAndRateMovieByIdFactory } from '@infrastructure/factories/movies/getCommentsAndRateMovieByIdFactory';
import { getMoviesByGenreFactory } from '@infrastructure/factories/movies/getMoviesByGenreFactory';
import { registerMovieFactory } from '@infrastructure/factories/movies/registerFactory';
import { updaterMovieFactory } from '@infrastructure/factories/movies/updaterMovieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function movieRoutes(router: Router, prismaService: PrismaService) {
  router.post('/movie/register', (req, res) =>
    expressRouteAdapter(req, res, registerMovieFactory(prismaService)),
  );
  router.get('/movie/list', (req, res) =>
    expressRouteAdapter(req, res, getAllMovieFactory(prismaService)),
  );

  router.get('/movie/title', (req, res) =>
    expressRouteAdapter(req, res, getByTitleMovieFactory(prismaService)),
  );

  router.get('/movie/genre', (req, res) =>
    expressRouteAdapter(req, res, getMoviesByGenreFactory(prismaService)),
  );
  router.get('/movie/comments-rate', (req, res) =>
    expressRouteAdapter(req, res, getCommentsAndRateMovieByIdFactory(prismaService)),
  );
  router.put('/movie/updater/:id', (req, res) =>
    expressRouteAdapter(req, res, updaterMovieFactory(prismaService)),
  );
}
