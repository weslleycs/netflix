import RegisterRateSerieUseCase from '@application/useCases/rates/registerRateSerieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { RegisterRateSerie } from '@domain/types/rateType';
import { IController } from '@presentation/controllers/ports/IController';
import { AppError, ErrorCode } from '@shared/errors/AppError';

type RegisterRateSerieBody = Omit<RegisterRateSerie, 'userId'>;

class RegisterRateSerieController
  implements IController<object, object, object, RegisterRateSerieBody, string>
{
  registerRateSerieUseCase: RegisterRateSerieUseCase;
  constructor(registerRateSerieUseCase: RegisterRateSerieUseCase) {
    this.registerRateSerieUseCase = registerRateSerieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, RegisterRateSerieBody>,
  ): Promise<httpResponseType<string>> {
    if (input.userId === undefined) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Unauthorized');
    }

    await this.registerRateSerieUseCase.execute({
      ...input.body,
      userId: input.userId,
    });
    return {
      statusCode: 200,
      data: 'Rate Serie sucess',
    };
  }
}

export default RegisterRateSerieController;
