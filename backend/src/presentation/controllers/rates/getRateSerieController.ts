import GetRateSerieUseCase from '@application/useCases/rates/getRateSerieUseCase';
import { SerieInput } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetRateSerie } from '@domain/types/rateType';
import { IController } from '@presentation/controllers/ports/IController';

class GetRateSerieController
  implements IController<object, object, SerieInput, object, GetRateSerie>
{
  private readonly getRateSerieUseCase: GetRateSerieUseCase;
  constructor(getRateSerieUseCase: GetRateSerieUseCase) {
    this.getRateSerieUseCase = getRateSerieUseCase;
  }
  async run(
    input: controllerInputType<object, object, SerieInput, object>,
  ): Promise<httpResponseType<GetRateSerie>> {
    const rate = await this.getRateSerieUseCase.execute(input.query);
    return {
      statusCode: 200,
      data: rate,
    };
  }
}

export default GetRateSerieController;
