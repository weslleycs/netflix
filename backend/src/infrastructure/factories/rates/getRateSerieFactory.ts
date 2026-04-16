import GetRateSerieUseCase from '@application/useCases/rates/getRateSerieUseCase';
import RateRepository from '@infrastructure/repositories/rateRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetRateSerieController from '@presentation/controllers/rates/getRateSerieController';

export function getRateSerieFactory(prismaService: PrismaService): GetRateSerieController {
  const rateRepository = new RateRepository(prismaService);
  const getRasteSerieUseCase = new GetRateSerieUseCase(rateRepository);
  const controller = new GetRateSerieController(getRasteSerieUseCase);
  return controller;
}
