import { CreateSerieInput } from '@domain/types/serieType';
import { ISerieRepository } from '@application/repositories/ports/ISerieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterSerieUseCase implements IUseCase<CreateSerieInput, boolean> {
  private readonly serieRepository: ISerieRepository;

  constructor(serieRepository: ISerieRepository) {
    this.serieRepository = serieRepository;
  }

  async execute(input: CreateSerieInput): Promise<boolean> {
    return this.serieRepository.register(input);
  }
}

export default RegisterSerieUseCase;
