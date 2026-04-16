import SerieDetailsUseCase from '@application/useCases/series/serieDetailsUseCase';
import SerieRepository from '@infrastructure/repositories/serieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import SerieDetailsController from '@presentation/controllers/series/serieDetailsController';

export function serieDetailsFactory(prismaService: PrismaService): SerieDetailsController {
  const serieRepository = new SerieRepository(prismaService);
  const serieDetailsUseCase = new SerieDetailsUseCase(serieRepository);
  const controller = new SerieDetailsController(serieDetailsUseCase);
  return controller;
}
