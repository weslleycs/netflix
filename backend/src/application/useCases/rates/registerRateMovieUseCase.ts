import { RegisterRateMovie } from '@domain/types/rateType';
import RateRepository from '@infrastructure/repositories/rateRepository';

class RegisterRateMovieUseCase {
  rateRepository: RateRepository;
  constructor(rateRepository: RateRepository) {
    this.rateRepository = rateRepository;
  }
  async execute(input: RegisterRateMovie): Promise<boolean> {
    return await this.rateRepository.registerRateMovie(input);
  }
}

export default RegisterRateMovieUseCase;
