import PrismaService from "@infrastructure/services/prisma.service";
import MovieController from "@presentation/controllers/Movies/registerMovie.controller";


export function movieSearchFactory(prismaService: PrismaService): MovieController {
  const movieSearchRepository = new MovieSearchRepository(prismaService);
  const movieSearchUseCase = new MovieSearchUseCase(movieSearchRepository);
  const controller = new MovieSearchController(movieSearchUseCase);

  return controller;
}
