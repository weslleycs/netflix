import GetByTitleMovieUseCase from '@application/useCases/movies/getByTitleUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetByTitleMovie, Movies } from '@domain/types/movieType';

class GetByTitleMovieController {
  private readonly movieUseCase: GetByTitleMovieUseCase;

  constructor(movieUseCase: GetByTitleMovieUseCase) {
    this.movieUseCase = movieUseCase;
  }

  async run(
    input: controllerInputType<object, object, GetByTitleMovie, object>,
  ): Promise<httpResponseType<Movies[]>> {
    const movies = await this.movieUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: movies,
    };
  }
}

export default GetByTitleMovieController;
