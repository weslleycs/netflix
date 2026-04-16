import SerieDetailsUseCase from '@application/useCases/series/serieDetailsUseCase';
import { SerieInput } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { SerieDetails } from '@domain/types/serieType';

class SerieDetailsController {
  private readonly serieDetailsUseCase: SerieDetailsUseCase;
  constructor(serieDetailsUseCase: SerieDetailsUseCase) {
    this.serieDetailsUseCase = serieDetailsUseCase;
  }
  async run(
    input: controllerInputType<object, object, SerieInput, object>,
  ): Promise<httpResponseType<SerieDetails>> {
    const datails = await this.serieDetailsUseCase.execute(input.query.serieId);
    return {
      statusCode: 200,
      data: datails,
    };
  }
}

export default SerieDetailsController;
