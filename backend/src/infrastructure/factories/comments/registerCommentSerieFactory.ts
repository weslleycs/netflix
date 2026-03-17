import RegisterCommentSerieUseCase from '@application/useCases/comments/registerCommentSerieUseCase';
import CommentRepository from '@infrastructure/repositories/commentRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterCommentSerieController from '@presentation/controllers/comments/registerCommentSerieController';

export function registerCommentSerieFactory(
  prismaService: PrismaService,
): RegisterCommentSerieController {
  const commentRepository = new CommentRepository(prismaService);
  const registerCommentSerieUseCase = new RegisterCommentSerieUseCase(commentRepository);
  const controller = new RegisterCommentSerieController(registerCommentSerieUseCase);
  return controller;
}
