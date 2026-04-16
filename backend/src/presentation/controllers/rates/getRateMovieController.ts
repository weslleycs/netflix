import GetRateMovieUseCase from '@application/useCases/rates/getRateMovieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetRateMovie, MovieInput } from '@domain/types/rateType';

class GetRateMovieController {
  private readonly getRateMovieUseCase: GetRateMovieUseCase;
  constructor(getRateMovieUseCase: GetRateMovieUseCase) {
    this.getRateMovieUseCase = getRateMovieUseCase;
  }
  async run(
    input: controllerInputType<object, MovieInput, object, object>,
  ): Promise<httpResponseType<GetRateMovie>> {
    const rate = await this.getRateMovieUseCase.execute(input.params);
    return {
      statusCode: 200,
      data: rate,
    };
  }
}

export default GetRateMovieController;
