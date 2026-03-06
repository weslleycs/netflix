import RegisterGenreUseCase from '@application/useCases/genres/registerUseCase';
import GenreRepository from '@infrastructure/repositories/genreRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterGenreController from '@presentation/controllers/genres/registerController';

export function registerGenreFactory(prismaService: PrismaService): RegisterGenreController {
  const genreRepository = new GenreRepository(prismaService);
  const genreUseCase = new RegisterGenreUseCase(genreRepository);
  const controller = new RegisterGenreController(genreUseCase);

  return controller;
}
