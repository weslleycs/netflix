import { MovieDetails } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class MovieDetailsUseCase {
  private readonly movieRepository: MovieRepository;
  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }
  async execute(movieId: number): Promise<MovieDetails> {
    return this.movieRepository.movieDetailsById(movieId);
  }
}

export default MovieDetailsUseCase;
