import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { registerRateMovieFactory } from '@infrastructure/factories/rates/registerRateMovieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function rateRoutes(router: Router, prismaService: PrismaService) {
  router.post('/rate/movie', (req, res) =>
    expressRouteAdapter(req, res, registerRateMovieFactory(prismaService)),
  );
}
