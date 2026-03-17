import RegisterCommentMovieUseCase from '@application/useCases/comments/registerCommentMovieUseCase';
import CommentRepository from '@infrastructure/repositories/commentRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterCommentMovieController from '@presentation/controllers/comments/registerCommentMovieCotroller';

export function registerCommentMovieFactory(
  prismaService: PrismaService,
): RegisterCommentMovieController {
  const commentRepositoy = new CommentRepository(prismaService);
  const registerCommentMovieUseCase = new RegisterCommentMovieUseCase(commentRepositoy);
  const controller = new RegisterCommentMovieController(registerCommentMovieUseCase);
  return controller;
}
