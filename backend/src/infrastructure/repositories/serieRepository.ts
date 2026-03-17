import {
  CreateSerieInput,
  GetAllLimite,
  GetCommentsAndRateSerieById,
  GetCommentsAndRateSerieByIdOutput,
  GetSeriesByGenre,
  Serie,
  SerieInput,
} from '@domain/types/serieType';
import PrismaService from '@infrastructure/services/prisma.service';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class SerieRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async register(input: CreateSerieInput): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.series.create({
        data: {
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
        },
      });
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async listall(input: GetAllLimite): Promise<Serie[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const { limit = 100, page = 1 } = input;
      return prisma.series.findMany({
        take: Number(limit),
        skip: Number((page - 1) * limit),
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async serchByTitle(input: SerieInput): Promise<Serie[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const { limit = 100, page = 1 } = input;
      const series = await prisma.series.findMany({
        take: Number(limit),
        skip: Number((page - 1) * limit),
        where: {
          title: {
            contains: input.title,
          },
        },
      });
      return series;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async GetCommentsAndRateSerie(
    input: GetCommentsAndRateSerieById,
  ): Promise<GetCommentsAndRateSerieByIdOutput> {
    try {
      const prisma = this.prismaService.getConnection();
      const { limit = 100, page = 1 } = input;
      const dataComments = await prisma.comments.findMany({
        take: Number(limit),
        skip: Number((page - 1) * limit),
        where: {
          serieId: Number(input.serieId),
        },
        select: {
          comment: true,
        },
      });
      const comments = dataComments.map((comment) => {
        return comment.comment;
      });
      const rate = await prisma.rates.aggregate({
        where: {
          serieId: Number(input.serieId),
        },
        _avg: {
          rate: true,
        },
      });
      return {
        comments,
        rate: rate._avg.rate ?? 0,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async searchByGenre(input: GetSeriesByGenre): Promise<Serie[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const { limit = 100, page = 1 } = input;
      return await prisma.series.findMany({
        take: Number(limit),
        skip: Number((page - 1) * limit),
        where: {
          seriesGenres: {
            some: {
              genre: {
                name: input.genre,
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default SerieRepository;
