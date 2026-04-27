import GetAllSerieUseCase from '@application/useCases/series/getAllUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { MovieListAllInput } from '@domain/types/movieType';
import { Serie } from '@domain/types/serieType';
import { IController } from '@presentation/controllers/ports/IController';

class GetAllSerieController
  implements IController<object, object, MovieListAllInput, object, Serie[]>
{
  private readonly serieUseCase: GetAllSerieUseCase;

  constructor(serieUseCase: GetAllSerieUseCase) {
    this.serieUseCase = serieUseCase;
  }

  async run(
    input: controllerInputType<object, object, MovieListAllInput, object>,
  ): Promise<httpResponseType<Serie[]>> {
    const series = await this.serieUseCase.execute(input.query);
    return { statusCode: 200, data: series };
  }
}

export default GetAllSerieController;
