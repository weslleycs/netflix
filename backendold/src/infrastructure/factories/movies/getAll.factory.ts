import MoviesGetAllUseCase from "@application/useCases/movie/getAll.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import PrismaService from "@infrastructure/services/prisma.service";
import MoviesGetAllController from "@presentation/controllers/movies/getAll.controller";




export function moviesGetAllFactory(prismaService: PrismaService): MoviesGetAllController {
  const moviesGetAllRepository = new MovieRepository(prismaService);
  const moviesGetAllUseCase = new MoviesGetAllUseCase(moviesGetAllRepository);
  const controller = new MoviesGetAllController(moviesGetAllUseCase);

  return controller;
}
