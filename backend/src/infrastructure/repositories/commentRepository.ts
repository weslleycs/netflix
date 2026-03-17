import { registerCommentSerie } from '@domain/types/commentType';
import PrismaService from '@infrastructure/services/prisma.service';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class CommentRepository {
  prismaService: PrismaService;
  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: registerCommentSerie): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.comments.create({
        data: {
          comment: input.comment,
          serieId: input.serieId,
          userId: input.userId,
        },
      });
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default CommentRepository;
