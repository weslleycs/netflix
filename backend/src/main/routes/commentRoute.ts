import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { deleteCommentFactory } from '@infrastructure/factories/comments/deleteCommentFactory';
import { editCommentFactory } from '@infrastructure/factories/comments/editCommentFactory';
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
  router.delete('/comment/:id', (req, res) =>
    expressRouteAdapter(req, res, deleteCommentFactory(prismaService)),
  );
  router.patch('/comment/:id', (req, res) =>
    expressRouteAdapter(req, res, editCommentFactory(prismaService)),
  );
}
