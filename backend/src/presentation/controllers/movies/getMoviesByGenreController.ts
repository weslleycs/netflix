// controllers/getMoviesByGenreController.ts

import GetMoviesByGenreUseCase from '@application/useCases/movies/getMoviesByGenreUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { GetMoviesByGenreinput, GetMoviesByGenreoutput } from '@domain/types/movieType';

class GetMoviesByGenreController {
  private readonly getMoviesByGenreUseCase: GetMoviesByGenreUseCase;

  constructor(getMoviesByGenreUseCase: GetMoviesByGenreUseCase) {
    this.getMoviesByGenreUseCase = getMoviesByGenreUseCase;
  }

  async run(
    input: controllerInputType<object, object, GetMoviesByGenreinput, object>,
  ): Promise<httpResponseType<GetMoviesByGenreoutput[]>> {
    const movies = await this.getMoviesByGenreUseCase.execute(input.query);

    return {
      statusCode: 200,
      data: movies,
    };
  }
}

export default GetMoviesByGenreController;
