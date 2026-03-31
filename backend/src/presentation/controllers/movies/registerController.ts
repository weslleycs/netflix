import RegisterMovieUseCase from '@application/useCases/movies/registerUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { CreateMovieInput } from '@domain/types/movieType';

class RegisterMovieController {
  private readonly movieUseCase: RegisterMovieUseCase;

  constructor(movieUseCase: RegisterMovieUseCase) {
    this.movieUseCase = movieUseCase;
  }

  async run(
    input: controllerInputType<object, object, object, CreateMovieInput>,
  ): Promise<httpResponseType<string>> {
    await this.movieUseCase.execute(input.body);

    return {
      statusCode: 200,
      data: 'Movie Register',
    };
  }
}

export default RegisterMovieController;
