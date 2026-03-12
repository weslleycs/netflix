import UpdaterMovieUseCase from '@application/useCases/movies/updaterMovieUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import UpdaterMovieController from '@presentation/controllers/movies/UpdaterMovieController';

export function updaterMovieFactory(prismaService: PrismaService): UpdaterMovieController {
  const movieRepository = new MovieRepository(prismaService);
  const updaterMovieUseCase = new UpdaterMovieUseCase(movieRepository);
  const controller = new UpdaterMovieController(updaterMovieUseCase);

  return controller;
}
