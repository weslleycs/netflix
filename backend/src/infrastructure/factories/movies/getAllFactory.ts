import GetAllMovieUseCase from '@application/useCases/movies/getAllUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetAllMovieController from '@presentation/controllers/movies/getAllController';

export function getAllMovieFactory(prismaService: PrismaService): GetAllMovieController {
  const movieRepository = new MovieRepository(prismaService);
  const movieUseCase = new GetAllMovieUseCase(movieRepository);
  const controller = new GetAllMovieController(movieUseCase);

  return controller;
}
