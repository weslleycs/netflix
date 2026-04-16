import {
  DeleteCommentInput,
  EditComment,
  GetCommentSerie,
  RegisterCommentMovie,
  RegisterCommentSerie,
  SerieInput,
} from '@domain/types/commentType';
import PrismaService from '@infrastructure/services/prisma.service';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class CommentRepository {
  prismaService: PrismaService;
  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async registerCommentSerie(input: RegisterCommentSerie): Promise<boolean> {
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

  async registerCommentMovie(input: RegisterCommentMovie): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.comments.create({
        data: {
          comment: input.comment,
          movieId: input.movieId,
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
  async deleteComment(data: DeleteCommentInput): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      const result = await prisma.comments.deleteMany({
        where: {
          id: data.commentId,
          userId: data.userId,
        },
      });
      if (result.count === 0) {
        throw new AppError(
          ErrorCode.NOT_FOUND,
          'Comentário não encontrado ou sem permissão para apagar',
        );
      }
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;

      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;

      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
  async editComment(data: EditComment): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.comments.update({
        where: {
          id: data.id,
        },
        data: {
          comment: data.comment,
        },
      });

      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;

      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;

      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async getCommentsSerie(input: SerieInput): Promise<GetCommentSerie[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const datacomments = await prisma.comments.findMany({
        where: {
          serieId: Number(input.serieId),
        },
        select: {
          id: true,
          user: true,
          comment: true,
        },
      });
      const comments = datacomments.map((comment) => {
        return {
          id: comment.id,
          userId: comment.user.id,
          userName: comment.user.name,
          comment: comment.comment,
        };
      });

      return comments;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default CommentRepository;
