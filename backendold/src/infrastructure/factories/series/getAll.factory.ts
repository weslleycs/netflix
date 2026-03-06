import SeriesGetAllUseCase from "@application/useCases/series/getAll.useCase";
import SerieRepository from "@infrastructure/repositories/serie.repository";
import PrismaService from "@infrastructure/services/prisma.service";
import SeriesGetAllController from "@presentation/controllers/series/getAll.controller";




export function seriesGetAllFactory(prismaService: PrismaService): SeriesGetAllController {
  const seriesGetAllRepository = new SerieRepository(prismaService);
  const seriesGetAllUseCase = new SeriesGetAllUseCase(seriesGetAllRepository);
  const controller = new SeriesGetAllController(seriesGetAllUseCase);

  return controller;
}
