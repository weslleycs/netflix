import RegisterCommentSerieUseCase from '@application/useCases/comments/registerCommentSerieUseCase';
import { RegisterCommentSerie } from '@domain/types/commentType';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { IController } from '@presentation/controllers/ports/IController';
import { AppError, ErrorCode } from '@shared/errors/AppError';

type RegisterCommentSerieBody = Omit<RegisterCommentSerie, 'userId'>;

class RegisterCommentSerieController
  implements IController<object, object, object, RegisterCommentSerieBody, string>
{
  private readonly registerCommentSerieUseCase: RegisterCommentSerieUseCase;

  constructor(registerCommentSerieUseCase: RegisterCommentSerieUseCase) {
    this.registerCommentSerieUseCase = registerCommentSerieUseCase;
  }

  async run(
    input: controllerInputType<object, object, object, RegisterCommentSerieBody>,
  ): Promise<httpResponseType<string>> {
    if (input.userId === undefined) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Unauthorized');
    }

    await this.registerCommentSerieUseCase.execute({
      ...input.body,
      userId: input.userId,
    });
    return {
      statusCode: 200,
      data: 'Comment registered successfully',
    };
  }
}

export default RegisterCommentSerieController;
