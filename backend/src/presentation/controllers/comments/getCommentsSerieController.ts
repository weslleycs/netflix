import GetCommentsSerieUseCase from '@application/useCases/comments/getCommentsSerieUseCase';
import { GetCommentSerie, SerieInput } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { IController } from '@presentation/controllers/ports/IController';

class GetCommentsSerieController
  implements IController<object, object, SerieInput, object, GetCommentSerie[]>
{
  private readonly getCommentsSerieUseCase: GetCommentsSerieUseCase;
  constructor(getCommentsSerieUseCase: GetCommentsSerieUseCase) {
    this.getCommentsSerieUseCase = getCommentsSerieUseCase;
  }
  async run(
    input: controllerInputType<object, object, SerieInput, object>,
  ): Promise<httpResponseType<GetCommentSerie[]>> {
    const data = await this.getCommentsSerieUseCase.execute(input.query);
    return {
      statusCode: 200,
      data: data,
    };
  }
}

export default GetCommentsSerieController;
