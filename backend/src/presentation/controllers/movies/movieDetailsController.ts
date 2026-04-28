import MovieDetailsUseCase from '@application/useCases/movies/movieDetailsUseCase';
import { controllerInputType, httpResponseType } from '@domain/types/controller.type';
import { MovieDetails, MovieDetailsInput } from '@domain/types/movieType';
import { IController } from '@presentation/controllers/ports/IController';

class MovieDetailsController
  implements IController<object, object, MovieDetailsInput, object, MovieDetails>
{
  private readonly movieDetailsUseCase: MovieDetailsUseCase;
  constructor(movieDetailsUseCase: MovieDetailsUseCase) {
    this.movieDetailsUseCase = movieDetailsUseCase;
  }
  async run(
    input: controllerInputType<object, object, MovieDetailsInput, object>,
  ): Promise<httpResponseType<MovieDetails>> {
    const data = await this.movieDetailsUseCase.execute(input.query.movieId);
    return {
      statusCode: 200,
      data: data,
    };
  }
}

export default MovieDetailsController;
