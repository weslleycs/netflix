import { Movies } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class GetAllMovieUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(): Promise<Movies[]> {
    return this.movieRepository.listAll();
  }
}

export default GetAllMovieUseCase;
