import RegisterGenreMovieUseCase from '@application/useCases/genres/registerGenreMovieUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { InputGenreMovie } from '@domain/types/genreType';

class RegisterGenreMovieController {
  private readonly genreMovieUseCase: RegisterGenreMovieUseCase;

  constructor(genreMovieUseCase: RegisterGenreMovieUseCase) {
    this.genreMovieUseCase = genreMovieUseCase;
  }

  async run(
    input: controllerInputType<object, object, object, InputGenreMovie>,
  ): Promise<httpResponseType<string>> {
    await this.genreMovieUseCase.execute(input.body);

    return {
      statusCode: 200,
      data: ' Genre Movie Register',
    };
  }
}

export default RegisterGenreMovieController;
