import GetRateMovieUseCase from '@application/useCases/rates/getRateMovieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetRateMovie, MovieInput } from '@domain/types/rateType';
import { IController } from '@presentation/controllers/ports/IController';

class GetRateMovieController
  implements IController<object, object, MovieInput, object, GetRateMovie>
{
  private readonly getRateMovieUseCase: GetRateMovieUseCase;
  constructor(getRateMovieUseCase: GetRateMovieUseCase) {
    this.getRateMovieUseCase = getRateMovieUseCase;
  }
  async run(
    input: controllerInputType<object, object, MovieInput, object>,
  ): Promise<httpResponseType<GetRateMovie>> {
    const rate = await this.getRateMovieUseCase.execute(input.query);
    return {
      statusCode: 200,
      data: rate,
    };
  }
}

export default GetRateMovieController;
