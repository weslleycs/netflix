import GetCommentsAndRateMovieByIdUseCase from '@application/useCases/movies/getCommentsAndRateMovieByIdUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import {
  GetCommentsAndRateMovieById,
  GetCommentsAndRateMovieByIdOutput,
} from '@domain/types/movieType';
import { IController } from '@presentation/controllers/ports/IController';

class GetCommentsAndRateMovieByIdController
  implements
    IController<
      object,
      object,
      GetCommentsAndRateMovieById,
      object,
      GetCommentsAndRateMovieByIdOutput
    >
{
  private readonly getMommentsAndRateMovieByIdUseCase: GetCommentsAndRateMovieByIdUseCase;

  constructor(getMommentsAndRateMovieByIdUseCase: GetCommentsAndRateMovieByIdUseCase) {
    this.getMommentsAndRateMovieByIdUseCase = getMommentsAndRateMovieByIdUseCase;
  }

  async run(
    input: controllerInputType<object, object, GetCommentsAndRateMovieById, object>,
  ): Promise<httpResponseType<GetCommentsAndRateMovieByIdOutput>> {
    const data = await this.getMommentsAndRateMovieByIdUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: data,
    };
  }
}

export default GetCommentsAndRateMovieByIdController;
