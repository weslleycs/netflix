import MovieSearchUseCase from "@application/useCases/Movie/registerSearch.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { MovieSearchInput, MovieSearchOutput } from "@domain/types/movie.type";



class MovieSearchController {
  private readonly movieSearchUseCase: MovieSearchUseCase;

  constructor(movieSearchUseCase: MovieSearchUseCase) {
    this.movieSearchUseCase = movieSearchUseCase;
  }

  async run(input: controllerInputType<object, MovieSearchInput, object, object>): Promise<httpResponseType<MovieSearchOutput[]>> {
    const movies = await this.movieSearchUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: movies,
    };
}

}

export default MovieSearchController;