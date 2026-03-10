import { InputGenreMovie } from '@domain/types/genreType';
import GenreRepository from '@infrastructure/repositories/genreRepository';

class RegisterGenreMovieUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(input: InputGenreMovie): Promise<boolean> {
    return this.genreRepository.registerGenreMovie(input);
  }
}

export default RegisterGenreMovieUseCase;
