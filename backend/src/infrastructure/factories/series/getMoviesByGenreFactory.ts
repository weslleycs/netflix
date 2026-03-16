import GetSeriesByGenreUseCase from '@application/useCases/series/getMoviesByGenreUseCase';
import SerieRepository from '@infrastructure/repositories/serieRepository';
import PrismaService from '@infrastructure/services/prisma.service';
import GetSeriesByGenreController from '@presentation/controllers/series/getMoviesByGenreController';

export function getSeriesByGenreFactory(prismaService: PrismaService): GetSeriesByGenreController {
  const serieRepository = new SerieRepository(prismaService);
  const getSeriesByGenreUseCase = new GetSeriesByGenreUseCase(serieRepository);
  const controller = new GetSeriesByGenreController(getSeriesByGenreUseCase);

  return controller;
}
