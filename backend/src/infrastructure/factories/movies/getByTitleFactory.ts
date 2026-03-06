import GetByTitleMovieUseCase from '@application/useCases/movies/getByTitleUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetByTitleMovieController from '@presentation/controllers/movies/getByTitleController';

export function getByTitleMovieFactory(prismaService: PrismaService): GetByTitleMovieController {
  const movieRepository = new MovieRepository(prismaService);
  const movieUseCase = new GetByTitleMovieUseCase(movieRepository);
  const controller = new GetByTitleMovieController(movieUseCase);

  return controller;
}
