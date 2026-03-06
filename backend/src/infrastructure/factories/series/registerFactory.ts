import RegisterSerieUseCase from '@application/useCases/series/registerUseCase';
import SerieRepository from '@infrastructure/repositories/serieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterSerieController from '@presentation/controllers/series/registerController';

export function registerSerieFactory(prismaService: PrismaService): RegisterSerieController {
  const serieRepository = new SerieRepository(prismaService);
  const serieUseCase = new RegisterSerieUseCase(serieRepository);
  const controller = new RegisterSerieController(serieUseCase);

  return controller;
}
