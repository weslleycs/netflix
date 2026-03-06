import RegisterSerieUseCase from '@application/useCases/series/registerUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { CreateSerieInput } from '@domain/types/serieType';

class RegisterSerieController {
  private readonly movieUseCase: RegisterSerieUseCase;

  constructor(movieUseCase: RegisterSerieUseCase) {
    this.movieUseCase = movieUseCase;
  }

  async run(
    input: controllerInputType<object, object, object, CreateSerieInput>,
  ): Promise<httpResponseType<string>> {
    await this.movieUseCase.execute(input.body);

    return {
      statusCode: 200,
      data: ' Serie Register',
    };
  }
}

export default RegisterSerieController;
