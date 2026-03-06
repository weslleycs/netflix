import { UpdaterMovie } from '@domain/types/movie.type';
import MovieRepository from '@infrastructure/repositories/movie.repository';

class UpdaterUseCase {
  private readonly movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: UpdaterMovie): Promise<boolean> {
    return this.movieRepository.updater(input);
  }
}

export default UpdaterUseCase;
