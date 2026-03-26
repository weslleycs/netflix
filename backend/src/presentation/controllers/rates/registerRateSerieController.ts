import RegisterRateSerieUseCase from '@application/useCases/rates/registerRateSerieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { RegisterRateSerie } from '@domain/types/rateType';

class RegisterRateSerieController {
  registerRateSerieUseCase: RegisterRateSerieUseCase;
  constructor(registerRateSerieUseCase: RegisterRateSerieUseCase) {
    this.registerRateSerieUseCase = registerRateSerieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, RegisterRateSerie>,
  ): Promise<httpResponseType<string>> {
    await this.registerRateSerieUseCase.execute(input.body);
    return {
      statusCode: 200,
      data: 'Rate Serie sucess',
    };
  }
}

export default RegisterRateSerieController;
