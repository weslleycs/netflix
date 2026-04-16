import { SerieInput } from '@domain/types/commentType';
import { GetRateSerie } from '@domain/types/rateType';
import RateRepository from '@infrastructure/repositories/rateRepository';

class GetRateSerieUseCase {
  private readonly rateRepository: RateRepository;
  constructor(rateRepository: RateRepository) {
    this.rateRepository = rateRepository;
  }
  async execute(input: SerieInput): Promise<GetRateSerie> {
    return await this.rateRepository.getRateSerie(input);
  }
}

export default GetRateSerieUseCase;
