import { GetSeriesByGenre, Serie } from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class GetSeriesByGenreUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: GetSeriesByGenre): Promise<Serie[]> {
    return this.serieRepository.searchByGenre(input);
  }
}

export default GetSeriesByGenreUseCase;
