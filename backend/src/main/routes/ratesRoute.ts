import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { getRateMovieFactory } from '@infrastructure/factories/rates/getRateMovieFactory';
import { getRateSerieFactory } from '@infrastructure/factories/rates/getRateSerieFactory';
import { registerRateMovieFactory } from '@infrastructure/factories/rates/registerRateMovieFactory';
import { registerRateSerieFactory } from '@infrastructure/factories/rates/registerRateSerieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { requireAuth } from '@presentation/middlewares/requireAuth.middleware';
import { validate } from '@presentation/middlewares/validate.middleware';
import {
  getRateMovieQuerySchema,
  getRateSerieQuerySchema,
  registerRateMovieBodySchema,
  registerRateSerieBodySchema,
} from '@presentation/schemas/rate.schemas';
import { Router } from 'express';

export function rateRoutes(router: Router, prismaService: PrismaService) {
  router.post(
    '/rate/register-movie',
    requireAuth,
    validate({ body: registerRateMovieBodySchema }),
    (req, res) => expressRouteAdapter(req, res, registerRateMovieFactory(prismaService)),
  );
  router.post(
    '/rate/register-serie',
    requireAuth,
    validate({ body: registerRateSerieBodySchema }),
    (req, res) => expressRouteAdapter(req, res, registerRateSerieFactory(prismaService)),
  );
  router.get(
    '/rate/movie',
    requireAuth,
    validate({ query: getRateMovieQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, getRateMovieFactory(prismaService)),
  );
  router.get(
    '/rate/serie',
    requireAuth,
    validate({ query: getRateSerieQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, getRateSerieFactory(prismaService)),
  );
}
