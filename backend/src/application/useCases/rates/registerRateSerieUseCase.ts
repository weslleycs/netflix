import { RegisterRateSerie } from '@domain/types/rateType';
import { IRateRepository } from '@application/repositories/ports/IRateRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterRateSerieUseCase implements IUseCase<RegisterRateSerie, boolean> {
  private readonly rateRepository: IRateRepository;

  constructor(rateRepository: IRateRepository) {
    this.rateRepository = rateRepository;
  }

  async execute(input: RegisterRateSerie): Promise<boolean> {
    return this.rateRepository.registerRateSerie(input);
  }
}

export default RegisterRateSerieUseCase;
