import MovieGetByTitleUseCase from "@application/useCases/movie/getByTitle.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { MovieSearchInput, MovieSearchOutput } from "@domain/types/movie.type";



class MovieGetByTitleController {
  private readonly movieGetByTitleUseCase: MovieGetByTitleUseCase;

  constructor(movieGetByTitleUseCase: MovieGetByTitleUseCase) {
    this.movieGetByTitleUseCase = movieGetByTitleUseCase;
  }

  async run(input: controllerInputType<object,  MovieSearchInput,object, object>): Promise<httpResponseType<MovieSearchOutput[]>> {
    const movies = await this.movieGetByTitleUseCase.execute(input.params);

    return {
      statusCode: 200,
      data: movies,
    };
}

}

export default MovieGetByTitleController;