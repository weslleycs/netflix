import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { getAllSerieFactory } from '@infrastructure/factories/series/getAllFactory';
import { registerSerieFactory } from '@infrastructure/factories/series/registerFactory';
import { serieDetailsFactory } from '@infrastructure/factories/series/serieDetailsFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { requireAuth } from '@presentation/middlewares/requireAuth.middleware';
import { validate } from '@presentation/middlewares/validate.middleware';
import {
  listSeriesQuerySchema,
  registerSerieBodySchema,
  serieIdQuerySchema,
} from '@presentation/schemas/serie.schemas';
import { Router } from 'express';

export function serieRoutes(router: Router, prismaService: PrismaService) {
  router.post(
    '/serie/register',
    requireAuth,
    validate({ body: registerSerieBodySchema }),
    (req, res) => expressRouteAdapter(req, res, registerSerieFactory(prismaService)),
  );

  router.get(
    '/serie/list',
    requireAuth,
    validate({ query: listSeriesQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, getAllSerieFactory(prismaService)),
  );

  router.get(
    '/serie/details',
    requireAuth,
    validate({ query: serieIdQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, serieDetailsFactory(prismaService)),
  );
}
