import RegisterMovieGenreUseCase from '@application/useCases/genres/genreMovie.useCase';
import GenreRepository from '@infrastructure/repositories/genreRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterMovieGenreController from '@presentation/controllers/genres/genreMovieController';

export function registerMovieGenreFactory(
  prismaService: PrismaService,
): RegisterMovieGenreController {
  const genreRepository = new GenreRepository(prismaService);
  const registerMovieGenreUseCase = new RegisterMovieGenreUseCase(genreRepository);
  const controller = new RegisterMovieGenreController(registerMovieGenreUseCase);

  return controller;
}
