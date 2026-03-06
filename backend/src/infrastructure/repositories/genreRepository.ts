import { CreateGenreInput } from '@domain/types/genreType';
import PrismaService from '@infrastructure/services/prisma.service';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class GenreRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async register(input: CreateGenreInput): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.genres.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async updater(data: UpdaterMovie): Promise<boolean> {
    const prisma = this.prismaService.getConnection();
    const { id, ...updaterData } = data;
    await prisma.movie.update({
      data: {
        ...updaterData,
        updatedAt: new Date(),
      },
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default GenreRepository;
