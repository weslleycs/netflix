import RegisterMovieUseCase from '@application/useCases/movies/registerUseCase';
import RegisterMovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterMovieController from '@presentation/controllers/movies/registerController';

export function registerMovieFactory(prismaService: PrismaService): RegisterMovieController {
  const movieRepository = new RegisterMovieRepository(prismaService);
  const movieUseCase = new RegisterMovieUseCase(movieRepository);
  const controller = new RegisterMovieController(movieUseCase);

  return controller;
}
