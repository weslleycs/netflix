import {
  GetCommentsAndRateSerieById,
  GetCommentsAndRateSerieByIdOutput,
} from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class GetCommentsAndRateSerieByIdUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: GetCommentsAndRateSerieById): Promise<GetCommentsAndRateSerieByIdOutput> {
    return this.serieRepository.GetCommentsAndRateSerie(input);
  }
}

export default GetCommentsAndRateSerieByIdUseCase;
