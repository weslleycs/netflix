import RegisterCommentMovieUseCase from '@application/useCases/comments/registerCommentMovieUseCase';
import CommentRepository from '@infrastructure/repositories/commentRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterCommentMovieController from '@presentation/controllers/comments/registerCommentMovieController';

export function registerCommentMovieFactory(
  prismaService: PrismaService,
): RegisterCommentMovieController {
  const commentRepository = new CommentRepository(prismaService);
  const registerCommentMovieUseCase = new RegisterCommentMovieUseCase(commentRepository);
  const controller = new RegisterCommentMovieController(registerCommentMovieUseCase);
  return controller;
}
