import {
  GetCommentsAndRateMovieById,
  GetCommentsAndRateMovieByIdOutput,
} from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class GetCommentsAndRateMovieByIdUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: GetCommentsAndRateMovieById): Promise<GetCommentsAndRateMovieByIdOutput> {
    return this.movieRepository.GetCommentsAndRate(input);
  }
}

export default GetCommentsAndRateMovieByIdUseCase;
