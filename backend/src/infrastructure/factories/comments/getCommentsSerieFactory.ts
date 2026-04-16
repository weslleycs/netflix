import GetCommentsSerieUseCase from '@application/useCases/comments/getCommentsSerieUseCase';
import CommentRepository from '@infrastructure/repositories/commentRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetCommentsSerieController from '@presentation/controllers/comments/GetCommetsSerieController';

export function getCommentsSerieFactory(prismaService: PrismaService): GetCommentsSerieController {
  const commentRepository = new CommentRepository(prismaService);
  const getCommentsSerieUseCase = new GetCommentsSerieUseCase(commentRepository);
  const controller = new GetCommentsSerieController(getCommentsSerieUseCase);
  return controller;
}
