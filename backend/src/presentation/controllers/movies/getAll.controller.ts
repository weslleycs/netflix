import MoviesGetAllUseCase from "@application/useCases/movie/getAll.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { MovieSearchOutput } from "@domain/types/movie.type";

class MoviesGetAllController {
  constructor(private readonly moviesGetAllUseCase: MoviesGetAllUseCase) {}

  async run(
    input: controllerInputType<object, object, object, object>
  ): Promise<httpResponseType<MovieSearchOutput[]>> {
    const movies = await this.moviesGetAllUseCase.execute();
    return { statusCode: 200, data: movies };
  }
}

export default MoviesGetAllController;
