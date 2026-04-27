import { Serie, SerieListAllInput } from '@domain/types/serieType';
import { ISerieRepository } from '@application/repositories/ports/ISerieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetAllSerieUseCase implements IUseCase<SerieListAllInput, Serie[]> {
  private readonly serieRepository: ISerieRepository;

  constructor(serieRepository: ISerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: SerieListAllInput): Promise<Serie[]> {
    return this.serieRepository.listall(input);
  }
}

export default GetAllSerieUseCase;
