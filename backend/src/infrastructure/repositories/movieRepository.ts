import {
  CreateMovieInput,
  GetByTitleMovie,
  GetCommentsAndRateMovieById,
  GetCommentsAndRateMovieByIdOutput,
  GetMoviesByGenreinput,
  GetMoviesByGenreoutput,
  MovieListAllInput,
  Movies,
  UpdaterMovie,
} from '@domain/types/movieType';
import PrismaService from '@infrastructure/services/prisma.service';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class MovieRepository {
  private readonly prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async register(input: CreateMovieInput): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      await prisma.movies.create({
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

  async listAll(input: MovieListAllInput): Promise<Movies[]> {
    const prisma = this.prismaService.getConnection();
    const { limit = 100, page = 1 } = input;
    return prisma.movies.findMany({
      take: Number(limit),
      skip: Number((page - 1) * limit),
    });
  }

  async serchByTitle(input: GetByTitleMovie): Promise<Movies[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const movies = await prisma.movies.findMany({
        where: {
          title: {
            contains: input.title,
          },
        },
      });
      return movies;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }

  async searchByGenre(input: GetMoviesByGenreinput): Promise<GetMoviesByGenreoutput[]> {
    try {
      const prisma = this.prismaService.getConnection();

      return await prisma.movies.findMany({
        where: {
          moviesGenres: {
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

  async GetCommentsAndRate(
    input: GetCommentsAndRateMovieById,
  ): Promise<GetCommentsAndRateMovieByIdOutput> {
    try {
      const prisma = this.prismaService.getConnection();
      const dataComments = await prisma.comments.findMany({
        where: {
          movieId: Number(input.movieId),
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
          movieId: Number(input.movieId),
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

  async updater(data: UpdaterMovie): Promise<boolean> {
    try {
      const prisma = this.prismaService.getConnection();
      const { id, ...updaterData } = data;
      await prisma.movies.update({
        data: {
          ...updaterData,
          updatedAt: new Date(),
        },
        where: {
          id: Number(id),
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

export default MovieRepository;
