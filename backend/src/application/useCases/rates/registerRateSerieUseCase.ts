import { RegisterRateSerie } from '@domain/types/rateType';
import RateRepository from '@infrastructure/repositories/rateRepository';

class RegisterRateSerieUseCase {
  rateRepository: RateRepository;
  constructor(rateRepository: RateRepository) {
    this.rateRepository = rateRepository;
  }
  async execute(input: RegisterRateSerie): Promise<boolean> {
    return await this.rateRepository.registerRateSerie(input);
  }
}

export default RegisterRateSerieUseCase;
