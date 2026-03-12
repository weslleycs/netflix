import { UpdaterMovie } from '@domain/types/movieType';
import MovieRepository from '@infrastructure/repositories/movieRepository';

class UpdaterMovieUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: UpdaterMovie): Promise<boolean> {
    return this.movieRepository.updater(input);
  }
}

export default UpdaterMovieUseCase;
