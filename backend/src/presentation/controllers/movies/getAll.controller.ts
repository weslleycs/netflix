import MoviesGetAllUseCase from "@application/useCases/movie/moviesList.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { MovieSearchOutput } from "@domain/types/movie.type";

class MoviesGetAllController {
  private readonly moviesGetAllUseCase: MoviesGetAllUseCase;

  constructor(moviesGetAllUseCase: MoviesGetAllUseCase) {
    this.moviesGetAllUseCase = moviesGetAllUseCase;
  }

  async run(input: controllerInputType<object,  object,object, object>): Promise<httpResponseType<MovieSearchOutput[]>> {
    const movies = await this.moviesGetAllUseCase.execute();

    return {
      statusCode: 200,
      data: movies,
    };
}

}

export default MoviesGetAllController;