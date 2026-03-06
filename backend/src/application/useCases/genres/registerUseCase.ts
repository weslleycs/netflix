import { CreateGenreInput } from '@domain/types/genreType';
import GenreRepository from '@infrastructure/repositories/genreRepository';

class RegisterGenreUseCase {
  private readonly movieRepository: GenreRepository;

  constructor(movieRepository: GenreRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(input: CreateGenreInput): Promise<boolean> {
    return this.movieRepository.register(input);
  }
}

export default RegisterGenreUseCase;
