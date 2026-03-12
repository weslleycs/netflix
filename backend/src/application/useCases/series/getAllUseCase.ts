import { GetAllLimite, Series } from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class GetAllSerieUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: GetAllLimite): Promise<Series[]> {
    return this.serieRepository.listall(input);
  }
}

export default GetAllSerieUseCase;
