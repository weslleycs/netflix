import { InputGenreMovie } from '@domain/types/genreType';
import { IGenreRepository } from '@application/repositories/ports/IGenreRepository';
import { IUseCase } from '@application/useCases/ports/IUseCase';

class RegisterGenreMovieUseCase implements IUseCase<InputGenreMovie, boolean> {
  private readonly genreRepository: IGenreRepository;

  constructor(genreRepository: IGenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(input: InputGenreMovie): Promise<boolean> {
    return this.genreRepository.registerGenreMovie(input);
  }
}

export default RegisterGenreMovieUseCase;
