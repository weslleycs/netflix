import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { registerCommentMovieFactory } from '@infrastructure/factories/comments/registerCommentMovieFactory';
import { registerCommentSerieFactory } from '@infrastructure/factories/comments/registerCommentSerieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { Router } from 'express';

export function commentRoutes(router: Router, prismaService: PrismaService) {
  router.post('/comment/serie', (req, res) =>
    expressRouteAdapter(req, res, registerCommentSerieFactory(prismaService)),
  );
  router.post('/comment/movie', (req, res) =>
    expressRouteAdapter(req, res, registerCommentMovieFactory(prismaService)),
  );
}
