import GetAllUseCase from '@application/useCases/genres/getAllUseCase';
import { httpResponseType } from '@domain/types/controller.type';
import { GetAllGenre } from '@domain/types/genreType';

class GetAllController {
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
