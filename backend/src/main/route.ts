import { Router } from 'express';
import PrismaService from '@infrastructure/services/prisma.service';
import { movieRoutes } from './routes/movies.route';
import { authenticationRoutes } from './routes/authenticationRoute';
import { genreRoutes } from './routes/genre.route';

export function createRouter(prismaService: PrismaService) {
  const router = Router();

  router.get('/ping', (_req, res) => {
    return res.status(200).json('pong');
  });

  authenticationRoutes(router, prismaService);
  movieRoutes(router, prismaService);
  genreRoutes(router, prismaService);

  return router;
}
