import EditCommentUseCase from '@application/useCases/comments/editCommentUseCase';
import CommentRepository from '@infrastructure/repositories/commentRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import EditCommentController from '@presentation/controllers/comments/edidtCommentController';

export function editCommentFactory(prismaService: PrismaService) {
  const commentRepository = new CommentRepository(prismaService);
  const editCommentUseCase = new EditCommentUseCase(commentRepository);
  const controller = new EditCommentController(editCommentUseCase);
  return controller;
}
