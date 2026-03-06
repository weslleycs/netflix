import GetAllSerieUseCase from '@application/useCases/series/getAllUseCase';
import { httpResponseType } from '@domain/types/controller.type';
import { Series } from '@domain/types/serieType';

class GetAllSerieController {
  private readonly serieUseCase: GetAllSerieUseCase;

  constructor(serieUseCase: GetAllSerieUseCase) {
    this.serieUseCase = serieUseCase;
  }

  async run(): Promise<httpResponseType<Series[]>> {
    const series = await this.serieUseCase.execute();
    return { statusCode: 200, data: series };
  }
}

export default GetAllSerieController;
