import RegisterGenreUseCase from '@application/useCases/genres/registerUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { CreateGenreInput } from '@domain/types/genreType';

class RegisterGenreMovieController {
  private readonly genreUseCase: RegisterGenreUseCase;

  constructor(genreUseCase: RegisterGenreUseCase) {
    this.genreUseCase = genreUseCase;
  }

  async run(
    input: controllerInputType<object, object, object, CreateGenreInput>,
  ): Promise<httpResponseType<string>> {
    await this.genreUseCase.execute(input.body);

    return {
      statusCode: 200,
      data: ' Genre Register',
    };
  }
}

export default RegisterGenreMovieController;
