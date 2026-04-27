import {
  GetCommentsAndRateMovieById,
  GetCommentsAndRateMovieByIdOutput,
} from '@domain/types/movieType';
import { IMovieRepository } from '@application/repositories/ports/IMovieRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class GetCommentsAndRateMovieByIdUseCase
  implements IUseCase<GetCommentsAndRateMovieById, GetCommentsAndRateMovieByIdOutput>
{
  private readonly movieRepository: IMovieRepository;

  constructor(movieRepository: IMovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: GetCommentsAndRateMovieById): Promise<GetCommentsAndRateMovieByIdOutput> {
    return this.movieRepository.GetCommentsAndRate(input);
  }
}

export default GetCommentsAndRateMovieByIdUseCase;
