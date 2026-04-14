import GetAllSeriesByGenresUseCase from '@application/useCases/genres/getAllSeriesByGenresUseCase';
import { httpResponseType } from '@domain/types/controller.type';
import { GetAllSeriesByGenresOutput } from '@domain/types/genreType';

class GetAllSeriesByGenresController {
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
