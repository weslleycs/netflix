import GetAllUseCase from '@application/useCases/genres/getAllUseCase';
import { httpResponseType } from '@domain/types/controller.type';
import { GetAllGenre } from '@domain/types/genreType';
import { IController } from '@presentation/controllers/ports/IController';

class GetAllController
  implements IController<object, object, object, object, GetAllGenre[]>
{
  private readonly getAllUseCase: GetAllUseCase;
  constructor(getAllUseCase: GetAllUseCase) {
    this.getAllUseCase = getAllUseCase;
  }
  async run(): Promise<httpResponseType<GetAllGenre[]>> {
    const genres = await this.getAllUseCase.execute();
    return {
      statusCode: 200,
      data: genres,
    };
  }
}

export default GetAllController;
