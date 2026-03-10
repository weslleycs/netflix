import GetByGenreMovieUseCase from '@application/useCases/movies/getByGenreUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetByGenreMovieController from '@presentation/controllers/movies/getByGenreController';

export function getByGenreMovieFactory(prismaService: PrismaService): GetByGenreMovieController {
  const movieRepository = new MovieRepository(prismaService);
  const movieUseCase = new GetByGenreMovieUseCase(movieRepository);
  const controller = new GetByGenreMovieController(movieUseCase);

  return controller;
}
