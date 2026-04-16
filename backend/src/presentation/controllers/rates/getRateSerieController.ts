import GetRateSerieUseCase from '@application/useCases/rates/getRateSerieUseCase';
import { SerieInput } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetRateSerie } from '@domain/types/rateType';

class GetRateSerieController {
  private readonly getRateSerieUseCase: GetRateSerieUseCase;
  constructor(getRateSerieUseCase: GetRateSerieUseCase) {
    this.getRateSerieUseCase = getRateSerieUseCase;
  }
  async run(
    input: controllerInputType<object, SerieInput, object, object>,
  ): Promise<httpResponseType<GetRateSerie>> {
    const rate = await this.getRateSerieUseCase.execute(input.params);
    return {
      statusCode: 200,
      data: rate,
    };
  }
}

export default GetRateSerieController;
