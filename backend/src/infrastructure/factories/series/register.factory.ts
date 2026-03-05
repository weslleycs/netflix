import RegisterSerieUseCase from '@application/useCases/series/register.useCase';
import SerieRepository from '@infrastructure/repositories/serie.repository';
import PrismaService from "@infrastructure/services/prisma.service";
import SerieController from '@presentation/controllers/series/register.controller';

export function serieRegisterFactory(prismaService: PrismaService): SerieController {
  const serieRepository = new SerieRepository(prismaService);
  const serieUseCase = new RegisterSerieUseCase(serieRepository);
  const controller = new SerieController(serieUseCase);

  return controller;
}
