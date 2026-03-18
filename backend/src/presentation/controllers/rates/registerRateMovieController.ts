import RegisterRateMovieUseCase from '@application/useCases/rates/registerRateMovieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { RegisterRateMovie } from '@domain/types/rateType';

class RegisterRateMovieController {
  registerRateMovieUseCase: RegisterRateMovieUseCase;
  constructor(registerRateMovieUseCase: RegisterRateMovieUseCase) {
    this.registerRateMovieUseCase = registerRateMovieUseCase;
  }
  async run(
    input: controllerInputType<object, object, object, RegisterRateMovie>,
  ): Promise<httpResponseType<string>> {
    await this.registerRateMovieUseCase.execute(input.body);
    return {
      statusCode: 200,
      data: ' Register rate Movie sucess',
    };
  }
}

export default RegisterRateMovieController;
