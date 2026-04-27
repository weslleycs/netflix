import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { loginFactory } from '@infrastructure/factories/authentication/loginFactory';
import { registerUserFactory } from '@infrastructure/factories/authentication/registerFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { validate } from '@presentation/middlewares/validate.middleware';
import { loginBodySchema, registerBodySchema } from '@presentation/schemas/auth.schemas';
import { Router } from 'express';

export function authenticationRoutes(router: Router, prismaService: PrismaService) {
  router.post('/auth/register', validate({ body: registerBodySchema }), (req, res) =>
    expressRouteAdapter(req, res, registerUserFactory(prismaService)),
  );
  router.post('/auth/login', validate({ body: loginBodySchema }), (req, res) =>
    expressRouteAdapter(req, res, loginFactory(prismaService)),
  );
}
