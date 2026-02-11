import RegisterMovieUseCase from "@application/useCases/Movie/registerMovie.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { CreateMovieInput } from "@domain/types/movie.type";



class MovieController {
  private readonly movieUseCase: RegisterMovieUseCase;

  constructor(movieUseCase: RegisterMovieUseCase) {
    this.movieUseCase = movieUseCase;
  }

  async run(input: controllerInputType<object, object, object, CreateMovieInput>): Promise<httpResponseType<string>> {
    await this.movieUseCase.execute(input.body);

    return {
      statusCode: 200,
      data: " Movie Register",
    };
  }
}

export default MovieController;