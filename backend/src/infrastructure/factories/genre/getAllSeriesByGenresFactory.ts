import GetAllSeriesByGenresUseCase from '@application/useCases/genres/getAllSeriesByGenresUseCase';
import GenreRepository from '@infrastructure/repositories/genreRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetAllSeriesByGenresController from '@presentation/controllers/genres/getAllSeriesByGenresController';

export function getAllSeriesByGenresFactory(
  prismaservice: PrismaService,
): GetAllSeriesByGenresController {
  const genreRepository = new GenreRepository(prismaservice);
  const getAllSeriesByGenresUseCase = new GetAllSeriesByGenresUseCase(genreRepository);
  const controller = new GetAllSeriesByGenresController(getAllSeriesByGenresUseCase);
  return controller;
}
