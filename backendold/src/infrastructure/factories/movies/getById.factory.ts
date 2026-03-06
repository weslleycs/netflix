import MovieGetByIdUseCase from "@application/useCases/movie/getById.useCase";
import MovieGetByTitleUseCase from "@application/useCases/movie/getByTitle.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import PrismaService from "@infrastructure/services/prisma.service";
import MovieGetByIdController from "@presentation/controllers/movies/getById.controller";





export function movieGetByIdFactory(prismaService: PrismaService): MovieGetByIdController {
  const movieGetByIdRepository = new MovieRepository(prismaService);
  const movieGetByIdUseCase = new MovieGetByIdUseCase(movieGetByIdRepository);
  const controller = new MovieGetByIdController(movieGetByIdUseCase);

  return controller;
}
