import GetAllMoviesByGenresUseCase from '@application/useCases/genres/getAllMoviesByGenresUseCase';
import { httpResponseType } from '@domain/types/controller.type';
import { GetAllMoviesByGenresOutput } from '@domain/types/genreType';
import { IController } from '@presentation/controllers/ports/IController';

class GetAllMoviesByGenresController
  implements IController<object, object, object, object, GetAllMoviesByGenresOutput[]>
{
  private readonly getAllMoviesByGenresUseCase: GetAllMoviesByGenresUseCase;
  constructor(getAllMoviesByGenresUseCase: GetAllMoviesByGenresUseCase) {
    this.getAllMoviesByGenresUseCase = getAllMoviesByGenresUseCase;
  }
  async run(): Promise<httpResponseType<GetAllMoviesByGenresOutput[]>> {
    const getAllMoviesByGenres = await this.getAllMoviesByGenresUseCase.execute();
    return {
      statusCode: 200,
      data: getAllMoviesByGenres,
    };
  }
}

export default GetAllMoviesByGenresController;
