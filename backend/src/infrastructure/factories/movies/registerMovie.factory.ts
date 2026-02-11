import PrismaService from "@infrastructure/services/prisma.service";
import RegisterMovieUseCase from "@application/useCases/Movie/registerMovie.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import MovieController from "@presentation/controllers/Movies/registerMovie.controller";


export function movieFactory(prismaService: PrismaService): MovieController {
  const movieRepository = new MovieRepository(prismaService);
  const movieUseCase = new RegisterMovieUseCase(movieRepository);
  const controller = new MovieController(movieUseCase);

  return controller;
}
