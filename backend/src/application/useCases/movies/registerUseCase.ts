import { CreateMovieInput } from '@domain/types/movie.type';
import MovieRepository from '@infrastructure/repositories/movie.repository';

class RegisterMovieUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: CreateMovieInput): Promise<boolean> {
    return this.movieRepository.register(input);
  }
}

export default RegisterMovieUseCase;
