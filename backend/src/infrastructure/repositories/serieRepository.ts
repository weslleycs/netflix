import { CreateSerieInput, SerieInput, Series } from '@domain/types/serieType';
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

  async listall(): Promise<Series[]> {
    try {
      const prisma = this.prismaService.getConnection();
      return prisma.series.findMany({ take: 10 });
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async serchByTitle(input: SerieInput): Promise<Series[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const series = await prisma.series.findMany({
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
}

export default SerieRepository;
