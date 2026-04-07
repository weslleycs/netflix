import GetAllUseCase from '@application/useCases/genres/getAllUseCase';
import GenreRepository from '@infrastructure/repositories/genreRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetAllController from '@presentation/controllers/genres/getAllController';

export function getAllFactory(prismaService: PrismaService): GetAllController {
  const genreRepository = new GenreRepository(prismaService);
  const getAllUseCase = new GetAllUseCase(genreRepository);
  const controller = new GetAllController(getAllUseCase);
  return controller;
}
