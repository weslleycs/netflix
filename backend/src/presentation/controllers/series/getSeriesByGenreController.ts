import { GetSeriesByGenre, Serie } from '@domain/types/serieType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import GetSeriesByGenreUseCase from '@application/useCases/series/getMoviesByGenreUseCase';

class GetSeriesByGenreController {
  private readonly getSeriesByGenreUseCase: GetSeriesByGenreUseCase;

  constructor(getSeriesByGenreUseCase: GetSeriesByGenreUseCase) {
    this.getSeriesByGenreUseCase = getSeriesByGenreUseCase;
  }

  async run(
    input: controllerInputType<object, object, GetSeriesByGenre, object>,
  ): Promise<httpResponseType<Serie[]>> {
    const series = await this.getSeriesByGenreUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: series,
    };
  }
}

export default GetSeriesByGenreController;
