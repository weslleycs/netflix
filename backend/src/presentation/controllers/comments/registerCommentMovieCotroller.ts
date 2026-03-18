import RegisterCommentMovieUseCase from '@application/useCases/comments/registerCommentMovieUseCase';
import { RegisterCommentMovie } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class RegisterCommentMovieController {
  registerCommentMovieUseCase: RegisterCommentMovieUseCase;
  constructor(registerCommentMovieUseCase: RegisterCommentMovieUseCase) {
    this.registerCommentMovieUseCase = registerCommentMovieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, RegisterCommentMovie>,
  ): Promise<httpResponseType<string>> {
    await this.registerCommentMovieUseCase.execute(input.body);
    return {
      statusCode: 200,
      data: 'Comment Ok',
    };
  }
}

export default RegisterCommentMovieController;
