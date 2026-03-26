import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { registerRateMovieFactory } from '@infrastructure/factories/rates/registerRateMovieFactory';
import { registerRateSerieFactory } from '@infrastructure/factories/rates/registerRateSerieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function rateRoutes(router: Router, prismaService: PrismaService) {
  router.post('/rate/movie', (req, res) =>
    expressRouteAdapter(req, res, registerRateMovieFactory(prismaService)),
  );
  router.post('/rate/serie', (req, res) =>
    expressRouteAdapter(req, res, registerRateSerieFactory(prismaService)),
  );
}
