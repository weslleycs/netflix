import GetRateMovieUseCase from '@application/useCases/rates/getRateMovieUseCase';
import RateRepository from '@infrastructure/repositories/rateRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetRateMovieController from '@presentation/controllers/rates/getRateMovieController';

export function getRateMovieFactory(prismaService: PrismaService): GetRateMovieController {
  const rateRepository = new RateRepository(prismaService);
  const getRasteMovieUseCase = new GetRateMovieUseCase(rateRepository);
  const controller = new GetRateMovieController(getRasteMovieUseCase);
  return controller;
}
