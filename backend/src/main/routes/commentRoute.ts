import expressRouteAdapter from '@infrastructure/adapters/expressRoute.adapter';
import { deleteCommentFactory } from '@infrastructure/factories/comments/deleteCommentFactory';
import { editCommentFactory } from '@infrastructure/factories/comments/editCommentFactory';
import { getCommentsSerieFactory } from '@infrastructure/factories/comments/getCommentsSerieFactory';
import { registerCommentMovieFactory } from '@infrastructure/factories/comments/registerCommentMovieFactory';
import { registerCommentSerieFactory } from '@infrastructure/factories/comments/registerCommentSerieFactory';
import PrismaService from '@infrastructure/services/prisma.service';
import { requireAuth } from '@presentation/middlewares/requireAuth.middleware';
import { validate } from '@presentation/middlewares/validate.middleware';
import {
  commentIdParamsSchema,
  editCommentBodySchema,
  getCommentsSerieQuerySchema,
  registerCommentMovieBodySchema,
  registerCommentSerieBodySchema,
} from '@presentation/schemas/comment.schemas';
import { Router } from 'express';

export function commentRoutes(router: Router, prismaService: PrismaService) {
  router.post(
    '/comment/serie',
    requireAuth,
    validate({ body: registerCommentSerieBodySchema }),
    (req, res) => expressRouteAdapter(req, res, registerCommentSerieFactory(prismaService)),
  );
  router.post(
    '/comment/movie',
    requireAuth,
    validate({ body: registerCommentMovieBodySchema }),
    (req, res) => expressRouteAdapter(req, res, registerCommentMovieFactory(prismaService)),
  );
  router.delete(
    '/comment/:id',
    requireAuth,
    validate({ params: commentIdParamsSchema }),
    (req, res) => expressRouteAdapter(req, res, deleteCommentFactory(prismaService)),
  );
  router.patch(
    '/comment/:id',
    requireAuth,
    validate({ params: commentIdParamsSchema, body: editCommentBodySchema }),
    (req, res) => expressRouteAdapter(req, res, editCommentFactory(prismaService)),
  );
  router.get(
    '/comments/serie',
    requireAuth,
    validate({ query: getCommentsSerieQuerySchema }),
    (req, res) => expressRouteAdapter(req, res, getCommentsSerieFactory(prismaService)),
  );
}
