import { CreateSerieInput, Serie, SerieDetails, SerieListAllInput } from '@domain/types/serieType';
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

  async listall(input: SerieListAllInput): Promise<Serie[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const { limit = 100, page = 1 } = input;
      return prisma.series.findMany({
        where: {
          id: input.id ? Number(input.id) : undefined,
          title: {
            contains: input.title,
          },
          seriesGenres: {
            some: {
              genre: {
                name: input.genre,
              },
            },
          },
        },
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
    const prisma = this.prismaService.getConnection();
    const [queryMovies, queryRate] = await Promise.all([
      prisma.series.findUnique({
        where: {
          id: Number(serieId),
        },
        include: {
          seriesGenres: {
            include: {
              genre: true,
            },
          },
        },
      }),
      prisma.rates.aggregate({
        where: {
          serieId: Number(serieId),
        },
        _avg: {
          rate: true,
        },
      }),
    ]);
    if (!queryMovies) {
      throw new Error('Not found movie with this ID.');
    }
    const serieDetails = {
      id: queryMovies.id,
      title: queryMovies.title ?? '',
      description: queryMovies.description ?? '',
      imageUrl: queryMovies.imageUrl ?? '',
      genre:
        queryMovies.seriesGenres.length === 0
          ? []
          : queryMovies.seriesGenres.map((movieGenre) => {
              return movieGenre.genre.name;
            }),
      rate: queryRate._avg.rate ?? 0,
    };
    return serieDetails;
  }
}

export default SerieRepository;
