import DeleteCommentUseCase from '@application/useCases/comments/deleteCommentUseCase';
import CommentRepository from '@infrastructure/repositories/commentRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import DeleteCommentController from '@presentation/controllers/comments/deleteCommentController';

export function deleteCommentFactory(prismaService: PrismaService) {
  const commentRepository = new CommentRepository(prismaService);
  const deleteCommentUseCase = new DeleteCommentUseCase(commentRepository);
  const controller = new DeleteCommentController(deleteCommentUseCase);
  return controller;
}
