import RegisterGenreMovieUseCase from '@application/useCases/genres/registerGenreMovieUseCase';
import GenreRepository from '@infrastructure/repositories/genreRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterGenreMovieController from '@presentation/controllers/genres/registerGenreMovieController';

export function registerGenreMovieFactory(
  prismaService: PrismaService,
): RegisterGenreMovieController {
  const genreMovieRepository = new GenreRepository(prismaService);
  const genreMovieUseCase = new RegisterGenreMovieUseCase(genreMovieRepository);
  const controller = new RegisterGenreMovieController(genreMovieUseCase);

  return controller;
}
