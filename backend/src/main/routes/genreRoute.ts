import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { getAllFactory } from '@infrastructure/factories/genre/getAllFactory';
import { registerGenreFactory } from '@infrastructure/factories/genre/registerFactory';
import { registerGenreMovieFactory } from '@infrastructure/factories/genre/registerGenreMovieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function genreRoutes(router: Router, prismaService: PrismaService) {
  router.post('/genre/register', (req, res) =>
    expressRouteAdapter(req, res, registerGenreFactory(prismaService)),
  );

  router.post('/genreMovie/register', (req, res) =>
    expressRouteAdapter(req, res, registerGenreMovieFactory(prismaService)),
  );

  router.get('/genre/list', (req, res) =>
    expressRouteAdapter(req, res, getAllFactory(prismaService)),
  );
}
