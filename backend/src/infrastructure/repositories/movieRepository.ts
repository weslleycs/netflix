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
    const queryMovies = await prisma.movies.findMany({
      where: {
        id: input.id ? Number(input.id) : undefined,
        title: {
          contains: input.title,
        },
        moviesGenres: {
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
    return queryMovies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        imageUrl: movie.imageUrl,
        userId: movie.userId,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      };
    });
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
    const prisma = this.prismaService.getConnection();
    const [queryMovies, queryRate] = await Promise.all([
      prisma.movies.findUnique({
        where: {
          id: Number(movieId),
        },
        include: {
          moviesGenres: {
            include: {
              genre: true,
            },
          },
        },
      }),
      prisma.rates.aggregate({
        where: {
          movieId: Number(movieId),
        },
        _avg: {
          rate: true,
        },
      }),
    ]);
    if (!queryMovies) {
      throw new Error('Not found movie with this ID.');
    }
    const movieDetails = {
      id: queryMovies.id,
      title: queryMovies.title ?? '',
      description: queryMovies.description ?? '',
      imageUrl: queryMovies.imageUrl ?? '',
      genre:
        queryMovies.moviesGenres.length === 0
          ? []
          : queryMovies.moviesGenres.map((movieGenre) => {
              return movieGenre.genre.name;
            }),
      rate: queryRate._avg.rate ?? 0,
    };
    return movieDetails;
  }
}

export default MovieRepository;
