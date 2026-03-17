import registerCommentMovieUseCase from '@application/useCases/comments/registerCommentMovieUseCase';
import { registerCommentMovie } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class RegisterCommentMovieController {
  registerCommentMovieUseCase: registerCommentMovieUseCase;
  constructor(registerCommentMovieUseCase: registerCommentMovieUseCase) {
    this.registerCommentMovieUseCase = registerCommentMovieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, registerCommentMovie>,
  ): Promise<httpResponseType<string>> {
    await this.registerCommentMovieUseCase.execute(input.body);
    return {
      statusCode: 200,
      data: 'Comment Ok',
    };
  }
}

export default RegisterCommentMovieController;
