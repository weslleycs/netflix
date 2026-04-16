import { GetRateMovie, MovieInput } from '@domain/types/rateType';
import RateRepository from '@infrastructure/repositories/rateRepository';

class GetRateMovieUseCase {
  private readonly rateRepository: RateRepository;
  constructor(rateRepository: RateRepository) {
    this.rateRepository = rateRepository;
  }
  async execute(input: MovieInput): Promise<GetRateMovie> {
    return await this.rateRepository.getRateMovie(input);
  }
}

export default GetRateMovieUseCase;
