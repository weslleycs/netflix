import { SerieInput } from '@domain/types/commentType';
import { GetRateSerie } from '@domain/types/rateType';
import { IRateRepository } from '@application/repositories/ports/IRateRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetRateSerieUseCase implements IUseCase<SerieInput, GetRateSerie> {
  private readonly rateRepository: IRateRepository;

  constructor(rateRepository: IRateRepository) {
    this.rateRepository = rateRepository;
  }

  async execute(input: SerieInput): Promise<GetRateSerie> {
    return this.rateRepository.getRateSerie(input);
  }
}

export default GetRateSerieUseCase;
