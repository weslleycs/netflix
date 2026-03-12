import GetByTitleSerieUseCase from '@application/useCases/series/getByTitleUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { SerieInput, Series } from '@domain/types/serieType';

class GetByTitleSerieController {
  private readonly getByTitleSerieUseCase: GetByTitleSerieUseCase;

  constructor(getByTitleSerieUseCase: GetByTitleSerieUseCase) {
    this.getByTitleSerieUseCase = getByTitleSerieUseCase;
  }

  async run(
    input: controllerInputType<object, object, SerieInput, object>,
  ): Promise<httpResponseType<Series[]>> {
    const movies = await this.getByTitleSerieUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: movies,
    };
  }
}

export default GetByTitleSerieController;
