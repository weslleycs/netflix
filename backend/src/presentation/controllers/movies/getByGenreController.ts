import GetByGenreMovieUseCase from '@application/useCases/movies/getByGenreUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';

class GetByGenreMovieController {
  private readonly movieUseCase: GetByGenreMovieUseCase;

  constructor(movieUseCase: GetByGenreMovieUseCase) {
    this.movieUseCase = movieUseCase;
  }

  async run(
    input: controllerInputType<object, object, GetByGenreMovie, object>,
  ): Promise<httpResponseType<Genres[]>> {
    const movies = await this.movieUseCase.execute(input.query);
    return {
      statusCode: 200,
      data: movies,
    };
  }
}

export default GetByGenreMovieController;
