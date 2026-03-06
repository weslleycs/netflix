import MovieGetByGenreUseCase from "@application/useCases/movie/getByGenre.useCase";
import MovieRepository from "@infrastructure/repositories/movie.repository";
import PrismaService from "@infrastructure/services/prisma.service";
import MovieGetByGenreController from "@presentation/controllers/movies/getByGenre.controller";




export function movieGetByGenreFactory(prismaService: PrismaService): MovieGetByGenreController {
  const movieGetByGenreRepository = new MovieRepository(prismaService);
  const movieGetByGenreUseCase = new MovieGetByGenreUseCase(movieGetByGenreRepository);
  const controller = new MovieGetByGenreController(movieGetByGenreUseCase);

  return controller;
}
