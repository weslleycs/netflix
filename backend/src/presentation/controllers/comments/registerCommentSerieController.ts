import RegisterCommentSerieUseCase from '@application/useCases/comments/registerCommentSerieUseCase';
import { registerCommentSerie } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class RegisterCommentSerieController {
  registerCommentSerieUseCase: RegisterCommentSerieUseCase;

  constructor(registerCommentSerieUseCase: RegisterCommentSerieUseCase) {
    this.registerCommentSerieUseCase = registerCommentSerieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, registerCommentSerie>,
  ): Promise<httpResponseType<string>> {
    await this.registerCommentSerieUseCase.execute(input.body);
    return {
      statusCode: 200,
      data: 'comentario Ok',
    };
  }
}
export default RegisterCommentSerieController;
