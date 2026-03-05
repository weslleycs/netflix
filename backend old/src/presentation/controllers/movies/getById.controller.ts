import MovieGetByIdUseCase from "@application/useCases/movie/getById.useCase";
import { controllerInputType, httpResponseType } from "@domain/types/controller.type";
import { GetById, MovieSearchOutput } from "@domain/types/movie.type";



class MovieGetByIdController {
  private readonly movieGetByIdUseCase: MovieGetByIdUseCase;

  constructor(movieGetByIdUseCase: MovieGetByIdUseCase) {
    this.movieGetByIdUseCase = movieGetByIdUseCase;
  }

  async run(input: controllerInputType<object, GetById, object, object>): Promise<httpResponseType<MovieSearchOutput>> {
    const movie = await this.movieGetByIdUseCase.execute(input.params);
    return {
      statusCode: 200,
      data: movie,
    };
}

}

export default MovieGetByIdController;