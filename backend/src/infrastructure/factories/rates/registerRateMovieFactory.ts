import RegisterRateMovieUseCase from '@application/useCases/rates/registerRateMovieUseCase';
import RateRepository from '@infrastructure/repositories/rateRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import RegisterRateMovieController from '@presentation/controllers/rates/registerRateMovieController';

export function registerRateMovieFactory(prismaService: PrismaService) {
  const rateRepository = new RateRepository(prismaService);
  const registerRateMovieUseCase = new RegisterRateMovieUseCase(rateRepository);
  const controller = new RegisterRateMovieController(registerRateMovieUseCase);
  return controller;
}
