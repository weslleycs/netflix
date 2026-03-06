import GetAllMovieUseCase from '@application/useCases/movies/getAllUseCase';
import { httpResponseType } from '@domain/types/controller.type';
import { Movies } from '@domain/types/movieType';

class GetAllMovieController {
  private readonly movieUseCase: GetAllMovieUseCase;

  constructor(movieUseCase: GetAllMovieUseCase) {
    this.movieUseCase = movieUseCase;
  }

  async run(): Promise<httpResponseType<Movies[]>> {
    const movies = await this.movieUseCase.execute();
    return { statusCode: 200, data: movies };
  }
}

export default GetAllMovieController;
