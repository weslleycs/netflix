import RegisterCommentMovieUseCase from '@application/useCases/comments/registerCommentMovieUseCase';
import { RegisterCommentMovie } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { IController } from '@presentation/controllers/ports/IController';
import { AppError, ErrorCode } from '@shared/errors/AppError';

type RegisterCommentMovieBody = Omit<RegisterCommentMovie, 'userId'>;

class RegisterCommentMovieController
  implements IController<object, object, object, RegisterCommentMovieBody, string>
{
  registerCommentMovieUseCase: RegisterCommentMovieUseCase;
  constructor(registerCommentMovieUseCase: RegisterCommentMovieUseCase) {
    this.registerCommentMovieUseCase = registerCommentMovieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, RegisterCommentMovieBody>,
  ): Promise<httpResponseType<string>> {
    if (input.userId === undefined) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Unauthorized');
    }

    await this.registerCommentMovieUseCase.execute({
      ...input.body,
      userId: input.userId,
    });
    return {
      statusCode: 200,
      data: 'Comment Ok',
    };
  }
}

export default RegisterCommentMovieController;
