import GetAllSerieUseCase from '@application/useCases/series/getAllUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetAllLimite, Series } from '@domain/types/serieType';

class GetAllSerieController {
  private readonly serieUseCase: GetAllSerieUseCase;

  constructor(serieUseCase: GetAllSerieUseCase) {
    this.serieUseCase = serieUseCase;
  }

  async run(
    input: controllerInputType<object, object, GetAllLimite, object>,
  ): Promise<httpResponseType<Series[]>> {
    const series = await this.serieUseCase.execute(input.query);
    return { statusCode: 200, data: series };
  }
}

export default GetAllSerieController;
