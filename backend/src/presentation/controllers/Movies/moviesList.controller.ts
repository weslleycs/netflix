import MoviesListUseCase from "@application/useCases/Movie/moviesList.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { MovieSearchOutput } from "@domain/types/movie.type";

class MoviesListController {
  private readonly moviesListUseCase: MoviesListUseCase;

  constructor(moviesListUseCase: MoviesListUseCase) {
    this.moviesListUseCase = moviesListUseCase;
  }

  async run(input: controllerInputType<object,  object,object, object>): Promise<httpResponseType<MovieSearchOutput[]>> {
    const movies = await this.moviesListUseCase.execute();

    return {
      statusCode: 200,
      data: movies,
    };
}

}

export default MoviesListController;