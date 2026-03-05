import MovieGetByGenreUseCase from "@application/useCases/movie/getByGenre.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { MovieSearchInput, MovieSearchOutput } from "@domain/types/movie.type";



class MovieGetByGenreController {
  private readonly movieGetByGenreUseCase: MovieGetByGenreUseCase;

  constructor(movieGetByGenreUseCase: MovieGetByGenreUseCase) {
    this.movieGetByGenreUseCase = movieGetByGenreUseCase;
  }

  async run(input: controllerInputType<object ,object,MovieSearchInput, object>): Promise<httpResponseType<MovieSearchOutput[]>> {
    const movies = await this.movieGetByGenreUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: movies,
    };
}

}

export default MovieGetByGenreController;