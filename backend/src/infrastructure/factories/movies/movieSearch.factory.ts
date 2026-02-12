import MovieSearchUseCase from "@application/useCases/Movie/registerSearch.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import PrismaService from "@infrastructure/services/prisma.service";
import MovieSearchController from "@presentation/controllers/Movies/movieSearch.controller";



export function movieSearchFactory(prismaService: PrismaService): MovieSearchController {
  const movieSearchRepository = new MovieRepository(prismaService);
  const movieSearchUseCase = new MovieSearchUseCase(movieSearchRepository);
  const controller = new MovieSearchController(movieSearchUseCase);

  return controller;
}
