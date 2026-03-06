import GetByTitleSerieUseCase from '@application/useCases/series/getByTitleUseCase';
import SerieRepository from '@infrastructure/repositories/serieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetByTitleSerieController from '@presentation/controllers/series/getByTitleController';

export function getByTitleSerieFactory(prismaService: PrismaService): GetByTitleSerieController {
  const serieRepository = new SerieRepository(prismaService);
  const serieUseCase = new GetByTitleSerieUseCase(serieRepository);
  const controller = new GetByTitleSerieController(serieUseCase);

  return controller;
}
