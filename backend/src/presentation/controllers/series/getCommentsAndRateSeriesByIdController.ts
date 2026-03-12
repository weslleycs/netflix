import GetCommentsAndRateSerieByIdUseCase from '@application/useCases/series/getCommentsAndRateSeriesByIdUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import {
  GetCommentsAndRateSerieById,
  GetCommentsAndRateSerieByIdOutput,
} from '@domain/types/serieType';

class GetCommentsAndRateSerieByIdController {
  private readonly getMommentsAndRateSerieByIdUseCase: GetCommentsAndRateSerieByIdUseCase;

  constructor(getMommentsAndRateSerieByIdUseCase: GetCommentsAndRateSerieByIdUseCase) {
    this.getMommentsAndRateSerieByIdUseCase = getMommentsAndRateSerieByIdUseCase;
  }

  async run(
    input: controllerInputType<object, object, GetCommentsAndRateSerieById, object>,
  ): Promise<httpResponseType<GetCommentsAndRateSerieByIdOutput>> {
    const data = await this.getMommentsAndRateSerieByIdUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: data,
    };
  }
}

export default GetCommentsAndRateSerieByIdController;
