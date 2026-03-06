import GetAllSerieUseCase from '@application/useCases/series/getAllUseCase';
import SerieRepository from '@infrastructure/repositories/serieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetAllSerieController from '@presentation/controllers/series/getAllController';

export function getAllSerieFactory(prismaService: PrismaService): GetAllSerieController {
  const serieRepository = new SerieRepository(prismaService);
  const serieUseCase = new GetAllSerieUseCase(serieRepository);
  const controller = new GetAllSerieController(serieUseCase);

  return controller;
}
