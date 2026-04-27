import { CreateSerieInput, Serie, SerieDetails, SerieListAllInput } from '@domain/types/serieType';
import { ISerieRepository } from '@application/repositories/ports/ISerieRepository';
import { IPrismaService } from '@infrastructure/services/ports/IPrismaService';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class SerieRepository implements ISerieRepository {
  private readonly prismaService: IPrismaService;

  constructor(prismaService: IPrismaService) {
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

  async listall(input: SerieListAllInput): Promise<Serie[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const { limit = 100, page = 1 } = input;
      return prisma.series.findMany({
        where: {
          id: input.id ? Number(input.id) : undefined,
          title: input.title ? { contains: input.title } : undefined,
          seriesGenres: input.genre
            ? { some: { genre: { name: input.genre } } }
            : undefined,
        },
        orderBy: { createdAt: 'desc' },
        take: Number(limit),
        skip: Number((page - 1) * limit),
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async serieDetailsById(serieId: number): Promise<SerieDetails> {
    try {
      const prisma = this.prismaService.getConnection();
      const [querySerie, queryRate] = await Promise.all([
        prisma.series.findUnique({
          where: { id: Number(serieId) },
          include: { seriesGenres: { include: { genre: true } } },
        }),
        prisma.rates.aggregate({
          where: { serieId: Number(serieId) },
          _avg: { rate: true },
        }),
      ]);
      if (!querySerie) {
        throw new AppError(ErrorCode.NOT_FOUND, 'Serie not found');
      }
      return {
        id: querySerie.id,
        title: querySerie.title ?? '',
        description: querySerie.description ?? '',
        imageUrl: querySerie.imageUrl ?? '',
        genre: querySerie.seriesGenres.map((sg) => sg.genre.name),
        rate: queryRate._avg.rate ?? 0,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default SerieRepository;
