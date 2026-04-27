import GetAllSeriesByGenresUseCase from '@application/useCases/genres/getAllSeriesByGenresUseCase';
import { httpResponseType } from '@domain/types/controller.type';
import { GetAllSeriesByGenresOutput } from '@domain/types/genreType';
import { IController } from '@presentation/controllers/ports/IController';

class GetAllSeriesByGenresController
  implements IController<object, object, object, object, GetAllSeriesByGenresOutput[]>
{
  private readonly getAllSeriesByGenresUseCase: GetAllSeriesByGenresUseCase;
  constructor(getAllSeriesByGenresUseCase: GetAllSeriesByGenresUseCase) {
    this.getAllSeriesByGenresUseCase = getAllSeriesByGenresUseCase;
  }
  async run(): Promise<httpResponseType<GetAllSeriesByGenresOutput[]>> {
    const getAllSeriesByGenres = await this.getAllSeriesByGenresUseCase.execute();
    return {
      statusCode: 200,
      data: getAllSeriesByGenres,
    };
  }
}

export default GetAllSeriesByGenresController;
