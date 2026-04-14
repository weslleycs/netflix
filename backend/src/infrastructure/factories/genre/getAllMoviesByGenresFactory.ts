import GetAllMoviesByGenresUseCase from '@application/useCases/genres/getAllMoviesByGenresUseCase';
import GenreRepository from '@infrastructure/repositories/genreRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetAllMoviesByGenresController from '@presentation/controllers/genres/getAllMoviesByGenresController';

export function getAllMoviesByGenresFactory(
  prismaservice: PrismaService,
): GetAllMoviesByGenresController {
  const genreRepository = new GenreRepository(prismaservice);
  const getAllMoviesByGenresUseCase = new GetAllMoviesByGenresUseCase(genreRepository);
  const controller = new GetAllMoviesByGenresController(getAllMoviesByGenresUseCase);
  return controller;
}
