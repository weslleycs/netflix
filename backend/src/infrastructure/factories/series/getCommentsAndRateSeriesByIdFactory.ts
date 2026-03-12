import GetCommentsAndRateSerieByIdUseCase from '@application/useCases/series/getCommentsAndRateSeriesByIdUseCase';
import SerieRepository from '@infrastructure/repositories/serieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetCommentsAndRateSerieByIdController from '@presentation/controllers/series/getCommentsAndRateSeriesByIdController';

export function getCommentsAndRateSerieByIdFactory(
  prismaService: PrismaService,
): GetCommentsAndRateSerieByIdController {
  const serieRepository = new SerieRepository(prismaService);
  const getCommentsAndRateSerieByIdUseCase = new GetCommentsAndRateSerieByIdUseCase(
    serieRepository,
  );
  const controller = new GetCommentsAndRateSerieByIdController(getCommentsAndRateSerieByIdUseCase);

  return controller;
}
