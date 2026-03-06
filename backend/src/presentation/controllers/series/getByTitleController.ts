import GetByTitleSerieUseCase from '@application/useCases/series/getByTitleUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { SerieInput, Series } from '@domain/types/serieType';

class GetByTitleSerieController {
  private readonly serieUseCase: GetByTitleSerieUseCase;

  constructor(serieUseCase: GetByTitleSerieUseCase) {
    this.serieUseCase = serieUseCase;
  }

  async run(
    input: controllerInputType<object, object, SerieInput, object>,
  ): Promise<httpResponseType<Series[]>> {
    const movies = await this.serieUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: movies,
    };
  }
}

export default GetByTitleSerieController;
