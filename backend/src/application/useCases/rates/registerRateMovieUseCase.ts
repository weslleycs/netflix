import { RegisterRateMovie } from '@domain/types/rateType';
import { IRateRepository } from '@application/repositories/ports/IRateRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterRateMovieUseCase implements IUseCase<RegisterRateMovie, boolean> {
  private readonly rateRepository: IRateRepository;

  constructor(rateRepository: IRateRepository) {
    this.rateRepository = rateRepository;
  }

  async execute(input: RegisterRateMovie): Promise<boolean> {
    return this.rateRepository.registerRateMovie(input);
  }
}

export default RegisterRateMovieUseCase;
