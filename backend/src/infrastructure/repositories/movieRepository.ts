import {
  CommentMovieInput,
  CommentMovieOutput,
  CreateMovieInput,
  GetCommentsAndRateMovieById,
  GetCommentsAndRateMovieByIdOutput,
  MovieDetails,
  MovieListAllInput,
  Movies,
  UpdaterMovie,
} from '@domain/types/movieType';
import { IMovieRepository } from '@application/repositories/ports/IMovieRepository';
import { IPrismaService } from '@infrastructure/services/ports/IPrismaService';
import { AppError, ErrorCode, ErrorMessage } from '@shared/errors/AppError';

class MovieRepository implements IMovieRepository {
  private readonly prismaService: IPrismaService;

  constructor(prismaService: IPrismaService) {
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
    try {
      const prisma = this.prismaService.getConnection();
      const { limit = 100, page = 1 } = input;
      const queryMovies = await prisma.movies.findMany({
        where: {
          id: input.id ? Number(input.id) : undefined,
          title: input.title ? { contains: input.title } : undefined,
          moviesGenres: input.genre
            ? { some: { genre: { name: input.genre } } }
            : undefined,
        },
        orderBy: { createdAt: 'desc' },
        take: Number(limit),
        skip: Number((page - 1) * limit),
      });
      return queryMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        imageUrl: movie.imageUrl,
        userId: movie.userId,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      }));
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
          id: true,
          comment: true,
          user: true,
        },
      });
      const comments = dataComments.map((comment) => {
        return {
          id: comment.id,
          comment: comment.comment,
          userName: comment.user.name,
        };
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

  async commentMovie(input: CommentMovieInput): Promise<CommentMovieOutput[]> {
    try {
      const prisma = this.prismaService.getConnection();
      const commentsMovie = await prisma.comments.findMany({
        where: {
          movieId: Number(input.movieId),
        },
        select: {
          id: true,
          comment: true,
          user: true,
        },
      });
      const commentsMoviesReturn = commentsMovie.map((comment) => {
        return {
          id: comment.id,
          comment: comment.comment,
          userName: comment.user.name,
        };
      });
      return commentsMoviesReturn;
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
  async movieDetailsById(movieId: number): Promise<MovieDetails> {
    try {
      const prisma = this.prismaService.getConnection();
      const [queryMovies, queryRate] = await Promise.all([
        prisma.movies.findUnique({
          where: { id: Number(movieId) },
          include: { moviesGenres: { include: { genre: true } } },
        }),
        prisma.rates.aggregate({
          where: { movieId: Number(movieId) },
          _avg: { rate: true },
        }),
      ]);
      if (!queryMovies) {
        throw new AppError(ErrorCode.NOT_FOUND, 'Movie not found');
      }
      return {
        id: queryMovies.id,
        title: queryMovies.title ?? '',
        description: queryMovies.description ?? '',
        imageUrl: queryMovies.imageUrl ?? '',
        genre: queryMovies.moviesGenres.map((mg) => mg.genre.name),
        rate: queryRate._avg.rate ?? 0,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      const message = error instanceof Error ? error.message : ErrorMessage.INTERNAL;
      throw new AppError(ErrorCode.INTERNAL, message);
    }
  }
}

export default MovieRepository;
