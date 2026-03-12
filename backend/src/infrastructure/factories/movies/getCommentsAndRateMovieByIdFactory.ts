import GetCommentsAndRateMovieByIdUseCase from '@application/useCases/movies/getCommentsAndRateMovieByIdUseCase';
import MovieRepository from '@infrastructure/repositories/movieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetCommentsAndRateMovieByIdController from '@presentation/controllers/movies/getCommentsAndRateMovieByIdController';

export function getCommentsAndRateMovieByIdFactory(
  prismaService: PrismaService,
): GetCommentsAndRateMovieByIdController {
  const movieRepository = new MovieRepository(prismaService);
  const getCommentsAndRateMovieByIdUseCase = new GetCommentsAndRateMovieByIdUseCase(
    movieRepository,
  );
  const controller = new GetCommentsAndRateMovieByIdController(getCommentsAndRateMovieByIdUseCase);

  return controller;
}
