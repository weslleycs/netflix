import GetMoviesByGenreUseCase from '@application/useCases/movies/getMoviesByGenreUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetMoviesByGenreController from '@presentation/controllers/movies/getMoviesByGenreController';

export function getMoviesByGenreFactory(prismaService: PrismaService): GetMoviesByGenreController {
  const movieRepository = new MovieRepository(prismaService);
  const getMoviesByGenreUseCase = new GetMoviesByGenreUseCase(movieRepository);
  const controller = new GetMoviesByGenreController(getMoviesByGenreUseCase);

  return controller;
}
