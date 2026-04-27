import MovieDetailsUseCase from '@application/useCases/movies/movieDetailsUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import MovieDetailsController from '@presentation/controllers/movies/movieDetailsController';

export function movieDetailsFactory(prismaService: PrismaService): MovieDetailsController {
  const movieRepository = new MovieRepository(prismaService);
  const movieDetailsUseCase = new MovieDetailsUseCase(movieRepository);
  const controller = new MovieDetailsController(movieDetailsUseCase);
  return controller;
}
