import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { getRateMovieFactory } from '@infrastructure/factories/rates/getRateMovieFactory';
import { getRateSerieFactory } from '@infrastructure/factories/rates/getRateSerieFactory';
import { registerRateMovieFactory } from '@infrastructure/factories/rates/registerRateMovieFactory';
import { registerRateSerieFactory } from '@infrastructure/factories/rates/registerRateSerieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function rateRoutes(router: Router, prismaService: PrismaService) {
  router.post('/rate/register-movie', (req, res) =>
    expressRouteAdapter(req, res, registerRateMovieFactory(prismaService)),
  );
  router.post('/rate/register-serie', (req, res) =>
    expressRouteAdapter(req, res, registerRateSerieFactory(prismaService)),
  );
  router.get('/rate/movie', (req, res) =>
    expressRouteAdapter(req, res, getRateMovieFactory(prismaService)),
  );
  router.get('/rate/serie', (req, res) =>
    expressRouteAdapter(req, res, getRateSerieFactory(prismaService)),
  );
}
