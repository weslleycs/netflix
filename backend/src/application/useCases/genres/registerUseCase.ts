import { CreateGenreInput } from '@domain/types/genreType';
import GenreRepository from '@infrastructure/repositories/genreRepository';

class RegisterGenreUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(input: CreateGenreInput): Promise<boolean> {
    return this.genreRepository.register(input);
  }
}

export default RegisterGenreUseCase;
