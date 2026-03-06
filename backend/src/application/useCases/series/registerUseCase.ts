import { CreateSerieInput } from '@domain/types/serieType';
import SerieRepository from '@infrastructure/repositories/serieRepository';

class RegisterSerieUseCase {
  private readonly serieRepository: SerieRepository;

  constructor(serieRepository: SerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: CreateSerieInput): Promise<boolean> {
    return this.serieRepository.register(input);
  }
}

export default RegisterSerieUseCase;
