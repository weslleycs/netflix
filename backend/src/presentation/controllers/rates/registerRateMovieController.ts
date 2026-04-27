import RegisterRateMovieUseCase from '@application/useCases/rates/registerRateMovieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { RegisterRateMovie } from '@domain/types/rateType';
import { IController } from '@presentation/controllers/ports/IController';
import { AppError, ErrorCode } from '@shared/errors/AppError';

type RegisterRateMovieBody = Omit<RegisterRateMovie, 'userId'>;

class RegisterRateMovieController
  implements IController<object, object, object, RegisterRateMovieBody, string>
{
  registerRateMovieUseCase: RegisterRateMovieUseCase;
  constructor(registerRateMovieUseCase: RegisterRateMovieUseCase) {
    this.registerRateMovieUseCase = registerRateMovieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, RegisterRateMovieBody>,
  ): Promise<httpResponseType<string>> {
    if (input.userId === undefined) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Unauthorized');
    }

    await this.registerRateMovieUseCase.execute({
      ...input.body,
      userId: input.userId,
    });
    return {
      statusCode: 200,
      data: ' Register rate Movie sucess',
    };
  }
}

export default RegisterRateMovieController;
