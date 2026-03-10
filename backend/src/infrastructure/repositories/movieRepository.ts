import {
  CreateMovieInput,
  Genres,
  GetByGenreMovie,
  GetByTitleMovie,
  Movies,
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

  async listAll(): Promise<Movies[]> {
    const prisma = this.prismaService.getConnection();
    return prisma.movies.findMany({
      take: 10,
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

  async serchByGenre(input: GetByGenreMovie): Promise<Genres[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const movies = await prisma.g.findMany({
        where: {
          title: {
            contains: input.movieId,
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

  // async serchByGenre(input: MovieSearchInput): Promise<MovieSearchOutput[]> {
  //   const prisma = this.prismaService.getConnection();
  //   const movies = await prisma.movie.findMany({
  //     where: {
  //       genre: input.genre,
  //     },
  //   });
  //   return movies;
  // }

  // async getById(input: GetById): Promise<MovieSearchOutput> {
  //   try {
  //     const prisma = this.prismaService.getConnection();
  //     const movie = await prisma.movie.findUnique({
  //       where: {
  //         id: Number(input.id),
  //       },
  //     });

  //     if (!movie) {
  //       throw new AppError(ErrorCode.NOT_FOUND, ErrorMessage.NOT_FOUND);
  //     }

  //     return movie;
  //   } catch (error) {
  //     if (error instanceof AppError) throw error;
  //     const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
  //     throw new AppError(ErrorCode.INTERNAL, message);
  //   }
  // }

  // async updater(data: UpdaterMovie): Promise<boolean> {
  //   const prisma = this.prismaService.getConnection();
  //   const { id, ...updaterData } = data;
  //   await prisma.movie.update({
  //     data: {
  //       ...updaterData,
  //       updatedAt: new Date(),
  //     },
  //     where: {
  //       id: Number(id),
  //     },
  //   });

  //   return true;
  // }
}

export default MovieRepository;
