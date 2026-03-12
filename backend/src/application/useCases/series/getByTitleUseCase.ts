import { SerieInput, Series } from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class GetByTitleSerieUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: SerieInput): Promise<Series[]> {
    return this.serieRepository.serchByTitle(input);
  }
}

export default GetByTitleSerieUseCase;
