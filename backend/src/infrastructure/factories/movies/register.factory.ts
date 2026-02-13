import PrismaService from "@infrastructure/services/prisma.service";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import MovieController from "@presentation/controllers/movies/register.controller";
import RegisterMovieUseCase from "@application/useCases/movie/register.useCase";

export function movieRegisterFactory(prismaService: PrismaService): MovieController {
  const movieRepository = new MovieRepository(prismaService);
  const movieUseCase = new RegisterMovieUseCase(movieRepository);
  const controller = new MovieController(movieUseCase);

  return controller;
}
