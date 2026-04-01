import CommentMovieUseCase from '@application/useCases/movies/commentMovieUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import CommentMovieController from '@presentation/controllers/movies/commentMovieController';

export function commentMovieFactory(prismaService: PrismaService): CommentMovieController {
  const movieRepository = new MovieRepository(prismaService);
  const commentMovieUseCase = new CommentMovieUseCase(movieRepository);
  const controller = new CommentMovieController(commentMovieUseCase);
  return controller;
}
