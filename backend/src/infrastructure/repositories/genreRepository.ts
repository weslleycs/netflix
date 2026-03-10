import { CreateGenreInput, InputGenreMovie } from '@domain/types/genreType';
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

  async registerGenreMovie(input: InputGenreMovie): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      const data = input.genreId.map((genreId) => ({
        movieId: input.movieId,
        genreId: Number(genreId),
      }));
      await prisma.movies_genres.deleteMany({
        where: {
          movieId: input.movieId,
        },
      });
      await prisma.movies_genres.createMany({
        data: data,
      });
      return true;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default GenreRepository;
