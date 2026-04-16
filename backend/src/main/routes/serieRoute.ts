import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { getAllSerieFactory } from '@infrastructure/factories/series/getAllFactory';
import { registerSerieFactory } from '@infrastructure/factories/series/registerFactory';
import { serieDetailsFactory } from '@infrastructure/factories/series/serieDetailsFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function serieRoutes(router: Router, prismaService: PrismaService) {
  router.post('/serie/register', (req, res) =>
    expressRouteAdapter(req, res, registerSerieFactory(prismaService)),
  );

  router.get('/serie/list', (req, res) =>
    expressRouteAdapter(req, res, getAllSerieFactory(prismaService)),
  );

  router.get('/serie/Details', (req, res) =>
    expressRouteAdapter(req, res, serieDetailsFactory(prismaService)),
  );
}
