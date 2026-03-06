import { GetByTitleMovie, Movies } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class GetByTitleMovieUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: GetByTitleMovie): Promise<Movies[]> {
    return this.movieRepository.serchByTitle(input);
  }
}

export default GetByTitleMovieUseCase;
