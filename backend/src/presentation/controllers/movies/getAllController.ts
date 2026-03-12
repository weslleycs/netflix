import GetAllMovieUseCase from '@application/useCases/movies/getAllUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { MovieListAllInput, Movies } from '@domain/types/movieType';

class GetAllMovieController {
  private readonly movieUseCase: GetAllMovieUseCase;

  constructor(movieUseCase: GetAllMovieUseCase) {
    this.movieUseCase = movieUseCase;
  }

  async run(
    input: controllerInputType<object, object, MovieListAllInput, object>,
  ): Promise<httpResponseType<Movies[]>> {
    const movies = await this.movieUseCase.execute(input.query);
    return { statusCode: 200, data: movies };
  }
}

export default GetAllMovieController;
