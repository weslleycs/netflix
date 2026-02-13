import PrismaService from "@infrastructure/services/prisma.service";
import RegisterMovieUseCase from "@application/useCases/movie/register.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import UpdaterController from "@presentation/controllers/movies/updater.controller";
import UpdaterUseCase from "@application/useCases/movie/updater.useCase";

export function movieUpdaterFactory(prismaService: PrismaService): UpdaterController {
  const updaterRepository = new MovieRepository(prismaService);
  const updaterUseCase = new UpdaterUseCase(updaterRepository);
  const controller = new UpdaterController(updaterUseCase);

  return controller;
}
