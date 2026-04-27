import { GetRateMovie, MovieInput } from '@domain/types/rateType';
import { IRateRepository } from '@application/repositories/ports/IRateRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetRateMovieUseCase implements IUseCase<MovieInput, GetRateMovie> {
  private readonly rateRepository: IRateRepository;

  constructor(rateRepository: IRateRepository) {
    this.rateRepository = rateRepository;
  }

  async execute(input: MovieInput): Promise<GetRateMovie> {
    return this.rateRepository.getRateMovie(input);
  }
}

export default GetRateMovieUseCase;
