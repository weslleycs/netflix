import MoviesListUseCase from "@application/useCases/Movie/moviesList.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import PrismaService from "@infrastructure/services/prisma.service";
import MoviesListController from "@presentation/controllers/Movies/moviesList.controller";



export function moviesListFactory(prismaService: PrismaService): MoviesListController {
  const moviesListRepository = new MovieRepository(prismaService);
  const moviesListUseCase = new MoviesListUseCase(moviesListRepository);
  const controller = new MoviesListController(moviesListUseCase);

  return controller;
}
