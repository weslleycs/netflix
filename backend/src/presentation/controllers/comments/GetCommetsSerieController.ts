import GetCommentsSerieUseCase from '@application/useCases/comments/getCommentsSerieUseCase';
import { GetCommentSerie, SerieInput } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class GetCommentsSerieController {
  private readonly getCommentsSerieUseCase: GetCommentsSerieUseCase;
  constructor(getCommentsSerieUseCase: GetCommentsSerieUseCase) {
    this.getCommentsSerieUseCase = getCommentsSerieUseCase;
  }
  async run(
    input: controllerInputType<object, SerieInput, object, object>,
  ): Promise<httpResponseType<GetCommentSerie[]>> {
    const data = await this.getCommentsSerieUseCase.execute(input.params);
    return {
      statusCode: 200,
      data: data,
    };
  }
}

export default GetCommentsSerieController;
