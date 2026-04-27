import { SerieDetails } from '@domain/types/serieType';
import { ISerieRepository } from '@application/repositories/ports/ISerieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class SerieDetailsUseCase implements IUseCase<number, SerieDetails> {
  private readonly serieRepository: ISerieRepository;

  constructor(serieRepository: ISerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(serieId: number): Promise<SerieDetails> {
    return this.serieRepository.serieDetailsById(serieId);
  }
}

export default SerieDetailsUseCase;
