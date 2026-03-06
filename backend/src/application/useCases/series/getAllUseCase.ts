import { Series } from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class GetAllSerieUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(): Promise<Series[]> {
    return this.serieRepository.listall();
  }
}

export default GetAllSerieUseCase;
