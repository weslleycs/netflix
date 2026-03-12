import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { getAllSerieFactory } from '@infrastructure/factories/series/getAllFactory';
import { getByTitleSerieFactory } from '@infrastructure/factories/series/getByTitleFactory';
import { getCommentsAndRateSerieByIdFactory } from '@infrastructure/factories/series/getCommentsAndRateSeriesByIdFactory';
import { registerSerieFactory } from '@infrastructure/factories/series/registerFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function serieRoutes(router: Router, prismaService: PrismaService) {
  router.post('/serie/register', (req, res) =>
    expressRouteAdapter(req, res, registerSerieFactory(prismaService)),
  );

  router.get('/serie/list', (req, res) =>
    expressRouteAdapter(req, res, getAllSerieFactory(prismaService)),
  );

  router.get('/serie/title', (req, res) =>
    expressRouteAdapter(req, res, getByTitleSerieFactory(prismaService)),
  );

  router.get('/serie/comments-rate', (req, res) =>
    expressRouteAdapter(req, res, getCommentsAndRateSerieByIdFactory(prismaService)),
  );
}
