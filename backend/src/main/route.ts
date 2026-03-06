import { Router } from 'express';
import PrismaService from '@infrastructure/services/prisma.service';
import { authenticationRoutes } from './routes/authenticationRoute';
import { serieRoutes } from './routes/serieRoute';
import { movieRoutes } from './routes/moviesRoute';
import { genreRoutes } from './routes/genreRoute';

export function createRouter(prismaService: PrismaService) {
  const router = Router();

  router.get('/ping', (_req, res) => {
    return res.status(200).json('pong');
  });

  authenticationRoutes(router, prismaService);
  movieRoutes(router, prismaService);
  genreRoutes(router, prismaService);
  serieRoutes(router, prismaService);

  return router;
}
