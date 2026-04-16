import { SerieDetails } from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class SerieDetailsUseCase {
  private readonly serieRepository: SerieRepository;
  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }
  async execute(serieId: number): Promise<SerieDetails> {
    return await this.serieRepository.serieDetailsById(serieId);
  }
}
export default SerieDetailsUseCase;
