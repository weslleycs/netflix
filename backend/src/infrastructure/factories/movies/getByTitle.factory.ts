import MovieGetByTitleUseCase from "@application/useCases/movie/getByTitle.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import PrismaService from "@infrastructure/services/prisma.service";
import MovieGetByTitleController from "@presentation/controllers/movies/getByTitle.controller";




export function movieGetByTitlleFactory(prismaService: PrismaService): MovieGetByTitleController {
  const movieGetByTitlleRepository = new MovieRepository(prismaService);
  const movieGetByTitlleUseCase = new MovieGetByTitleUseCase(movieGetByTitlleRepository);
  const controller = new MovieGetByTitleController(movieGetByTitlleUseCase);

  return controller;
}
